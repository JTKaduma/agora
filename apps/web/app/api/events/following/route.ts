import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = getAuthFromRequest(request);
  if (!auth?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.event.findMany({
    where: { followersOnly: true },
    orderBy: { startsAt: "asc" },
  });

  return NextResponse.json({ items });
}

