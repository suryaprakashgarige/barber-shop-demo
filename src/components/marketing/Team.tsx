// src/components/marketing/Team.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const BARBERS = [
  {
    name: "Marcus Webb",
    title: "Master Barber — 12 Years",
    specialty: "Skin Fades & Beard Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Jordan Lee",
    title: "Senior Barber — 7 Years",
    specialty: "Classic Cuts & Hot Towel Shave",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Tariq Osei",
    title: "Grooming Specialist — 5 Years",
    specialty: "Textured Hair & Scalp Treatments",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  }
];

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-header", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".team-header",
          start: "top 85%",
        }
      });

      gsap.utils.toArray(".team-card").forEach((card: any) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16 team-header">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Your Barbers
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Every cut is personal. So are the people behind them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 team-grid">
          {BARBERS.map((barber) => (
            <div
              key={barber.name}
              className="team-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-center group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-zinc-800 group-hover:border-primary transition-colors">
                <Image 
                  src={barber.image} 
                  alt={barber.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{barber.name}</h3>
              <p className="text-primary text-sm font-bold mb-4">{barber.title}</p>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                Specializing in <span className="text-white italic">{barber.specialty}</span>
              </p>
              <Link 
                href="#book"
                className={buttonVariants({
                  className: "w-full bg-zinc-800 hover:bg-primary hover:text-white text-zinc-300 font-bold transition-all rounded-sm h-11"
                })}
              >
                Book with {barber.name.split(' ')[0]}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
