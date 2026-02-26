import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CreateEventPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />
      
      {/* 
        Responsive Grid Layout Container
        Desktop: max width ~1200px, padding. Mobile: full padding.
      */}
      <div className="w-full max-w-[1221px] mx-auto px-4 lg:px-0 py-8 lg:py-12 flex-1 flex flex-col">
        {/* Typography: "Create your Event" header style - italicized, bold, large-scale */}
        <h1 className="text-[40px] md:text-[48px] font-bold italic text-[#1A1A1A] mb-8 lg:mb-10 tracking-tight pl-1">
          Create your Event
        </h1>

        {/* 
          2-column layout for desktop (image panel left, form panel right) 
          Mobile stacking: single column automatically via flex-col to lg:flex-row
        */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[60px] items-start">
          
          {/* 
            Cover Photo UI panel
            Large square image area, left panel.
          */}
          <div className="w-full lg:w-[450px] shrink-0">
            {/* 
              Aspect-square for perfect 1:1 ratio.
              Provides the decorative ticket-style border treatment and upload affordance.
            */}
            <button className="relative w-full aspect-square rounded-[24px] overflow-hidden group border border-black/5 shadow-sm text-left block">
              
              {/* Gradient Placeholder background simulating Figma export */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B7A75] via-[#314FB5] to-[#E35661]">
                
                {/* Decorative border treatment (inner dashed ticket style) */}
                <div className="absolute inset-4 border-[1.5px] border-dashed border-white/30 rounded-[16px] pointer-events-none" />
                
                {/* "You're Invited" text capsules overlay built with CSS for high-ficdelity 4x resolution compliance */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none">
                  <div className="-rotate-[15deg] flex flex-col items-center gap-5">
                     <span className="border-[2px] border-white text-white rounded-full px-8 py-2 text-4xl lg:text-[40px] font-medium tracking-wide">
                       You&apos;re
                     </span>
                     <span className="border-[2px] border-white text-white rounded-full px-10 py-2 text-4xl lg:text-[40px] font-medium tracking-wide translate-x-4">
                       Invited
                     </span>
                  </div>
                </div>
              </div>

              {/* 
                Camera icon centered within the area to indicate upload affordance
                Includes hover interaction state
              */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
                 {/* The icon container */}
                 <div className="w-[60px] h-[60px] bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-black group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/icons/camera.svg"
                      alt="Upload Cover Photo"
                      width={26}
                      height={26}
                      className="opacity-80"
                    />
                 </div>
              </div>

              {/* Screen reader text for accessibility */}
              <span className="sr-only">Upload cover photo for your event</span>
            </button>
          </div>

          {/* 
            Right Panel: Form Grid Structure Scaffold 
            Will hold all the inputs built in subsequent issues.
            Displays an empty state container for now per requirements.
          */}
          <div className="flex-1 w-full flex flex-col gap-6">
             <div className="w-full min-h-[400px] border-[1.5px] border-dashed border-black/10 rounded-2xl flex items-center justify-center text-black/40">
                {/* Placeholder for subsequent form elements */}
                <p className="text-sm font-medium">Form fields structure goes here</p>
             </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </main>
  );
}
