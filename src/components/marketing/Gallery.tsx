// src/components/marketing/Gallery.tsx
"use client";

import { useState, useRef, MouseEvent, TouchEvent } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

export function Gallery() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <section id="gallery" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Masterpieces</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Swipe left to see the transformation. A great cut isn't just about the hair; it's about the confidence it brings.
          </p>
        </div>

        {/* Before / After Slider */}
        <div className="max-w-4xl mx-auto mb-20">
          <div 
            ref={containerRef}
            className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none shadow-2xl"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Background) */}
            <Image
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop"
              alt="After Haircut"
              fill
              className="object-cover object-center pointer-events-none"
            />
            
            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-y-0 left-0 w-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <Image
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2000&auto=format&fit=crop"
                alt="Before Haircut"
                fill
                className="object-cover object-center pointer-events-none"
              />
              <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                Before
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-primary">
                <MoveHorizontal className="w-6 h-6" />
              </div>
            </div>

            <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
              After
            </div>
          </div>
        </div>

        {/* Regular Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1549314449-62ecdb7391ab?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1593726891038-05eea3801fec?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=800&fit=crop"
          ].map((src, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
              <Image 
                src={src} 
                alt={`Gallery image ${i+1}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
