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
      // Subtle fade-in on scroll entry / load
      gsap.from(".hero-anim", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(".hero-image", {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-20 lg:pt-0 lg:h-[90vh] flex items-center bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:grid lg:grid-cols-2 gap-12 items-center h-full pt-12 lg:pt-20">
        
        {/* Content */}
        <div className="max-w-2xl z-10 py-12 lg:py-0">
          <div className="flex items-center gap-3 mb-6 hero-anim">
            <span className="w-8 h-[2px] bg-primary block"></span>
            <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Premier Grooming</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-foreground leading-[1.1] mb-6 hero-anim">
            Masterful Cuts.<br />
            <span className="text-primary">Classic</span> Finish.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 hero-anim max-w-lg">
            Experience the sharpest cuts and closest shaves in town. Where traditional barbering meets modern style and excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 hero-anim">
            <Link href="#book" className={buttonVariants({ variant: "default" }) + " bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 text-base rounded-sm group flex items-center justify-center"}>
              Book Appointment 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#services" className={buttonVariants({ variant: "outline" }) + " h-14 px-8 text-base font-bold rounded-sm border-2 flex items-center justify-center text-foreground hover:bg-muted"}>
              View Our Services
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 hero-anim">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
              ].map((src, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-muted overflow-hidden relative shadow-sm">
                  <Image 
                    src={src} 
                    alt={`Happy customer ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-amber-400 text-lg">★★★★★</div>
              <p className="text-sm font-semibold text-foreground mt-1">4.9/5 from 500+ locals</p>
            </div>
          </div>
        </div>

        {/* Image - Absolute on Mobile/Tablet, Grid on Desktop */}
        <div className="relative h-[60vh] lg:h-full w-full rounded-tl-[100px] overflow-hidden bg-muted hero-image hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
            alt="Barber Shop Interior"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block" />
        </div>
      </div>

      {/* Mobile single image below content */}
      <div className="relative h-[50vh] w-full mt-8 lg:hidden rounded-t-[40px] overflow-hidden hero-image">
        <Image
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1000&auto=format&fit=crop"
          alt="Barber Shop Interior"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
