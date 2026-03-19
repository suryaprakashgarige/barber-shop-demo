// src/components/marketing/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", { y: 20, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.2 });
      gsap.from(".hero-image", { scale: 1.05, opacity: 0, duration: 1.5, ease: "power2.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-20 lg:pt-0 lg:h-[90vh] flex items-center bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 lg:grid lg:grid-cols-2 gap-12 items-center h-full pt-12 lg:pt-20">
        
        {/* Content */}
        <div className="max-w-2xl z-10 py-12 lg:py-0">
          <div className="flex items-center gap-3 mb-6 hero-anim">
            <span className="w-8 h-[2px] bg-amber-500 block"></span>
            <span className="text-sm font-bold tracking-widest uppercase text-amber-500">Premium Barbershop Experience</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white leading-[1.1] mb-6 hero-anim">
            More Than A Haircut.<br />
            An <span className="text-amber-500">Experience.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg hero-anim leading-relaxed">
            Step into a world-class grooming studio. Discover the perfect cut engineered for your face shape with our built-in AI Stylist, and book seamlessly online.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 hero-anim">
            <Link 
              href="#book" 
              className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg font-bold rounded-sm bg-amber-500 hover:bg-amber-600 text-zinc-950 group shadow-xl border-0" })}
            >
              Book Appointment 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#feature" 
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 text-lg font-bold rounded-sm border-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white" })}
            >
              Try AI Face Scanner
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 hero-anim">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
              ].map((src, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-zinc-950 bg-zinc-800 overflow-hidden relative shadow-sm">
                  <Image src={src} alt={`Happy customer ${i + 1}`} fill className="object-cover" sizes="48px" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-amber-500 text-lg">★★★★★</div>
              <p className="text-sm font-semibold text-zinc-300 mt-1">4.9/5 from 500+ locals</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-[60vh] lg:h-full lg:min-h-[600px] w-full rounded-tl-[100px] overflow-hidden bg-zinc-900 hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2000&q=80"
            alt="Barber Shop Interior"
            fill
            priority
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90 shadow-2xl"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent hidden lg:block pointer-events-none" />
        </div>
      </div>

      <div className="relative h-[50vh] w-full mt-8 lg:hidden rounded-t-[40px] overflow-hidden bg-zinc-900">
        <Image
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1400&q=80"
          alt="Barber Shop Interior"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
