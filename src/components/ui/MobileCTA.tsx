// src/components/ui/MobileCTA.tsx
"use client";

import { useEffect, useState } from "react";
import { Phone, Calendar } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden animate-in slide-in-from-bottom-full duration-300">
      <div className="flex gap-2">
        <a 
          href="tel:+15128673090"
          className="flex-shrink-0 w-14 h-14 bg-white border border-border rounded-full flex items-center justify-center shadow-xl text-zinc-950"
        >
          <Phone className="w-6 h-6" />
        </a>
        <Link 
          href="#book"
          className={buttonVariants({
            className: "flex-1 h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-full shadow-xl flex items-center justify-center gap-2"
          })}
        >
          <Calendar className="w-5 h-5" />
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
