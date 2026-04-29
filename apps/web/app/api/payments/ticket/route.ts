import { NextRequest, NextResponse } from "next/server";
import {
  getEventById,
  hasAvailableTickets,
  incrementMintedTickets,
} from "@/lib/events-store";
import { mintTicket } from "@/utils/stellar";

type TicketRequestBody = {
  eventId?: string;
  quantity?: number;
  buyerWallet?: string;
};

export async function POST(request: NextRequest) {
  let payload: TicketRequestBody;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const { eventId, quantity, buyerWallet } = payload;

  // Validation
  if (!eventId || typeof eventId !== "string") {
    return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
  }
  
  // Explicitly check quantity and cast to number for TypeScript safety
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  if (!buyerWallet || typeof buyerWallet !== "string") {
    return NextResponse.json({ error: "Invalid buyerWallet" }, { status: 400 });
  }

  const event = getEventById(eventId);
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  // TypeScript now knows 'quantity' is definitely a number here
  if (!hasAvailableTickets(event, quantity)) {
    return NextResponse.json({ error: "Not enough tickets available" }, { status: 409 });
  }

  try {
    const mintResult = await mintTicket(eventId, buyerWallet, quantity);
    incrementMintedTickets(eventId, quantity);

    return NextResponse.json(
      {
        ticketId: mintResult.ticketId,
        transactionXdr: mintResult.transactionXdr,
      },
      { status: 200 },
    );
  } catch (error) {
    // Log the error internally for debugging
    console.error("Minting Error:", error);
    return NextResponse.json({ error: "Failed to mint ticket" }, { status: 502 });
  }
}