// src/components/marketing/Services.tsx
import { Button } from "@/components/ui/button";
import { Scissors, Sparkles, Droplets } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Scissors,
    name: "Classic Haircut",
    price: "$35",
    description: "Tailored to your facial structure and personal style. Includes a hot towel finish.",
    popular: true,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=400&fit=crop"
  },
  {
    icon: Droplets,
    name: "Hot Towel Shave",
    price: "$45",
    description: "The traditional straight razor shave with essential oils and hot towels.",
    popular: false,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop"
  },
  {
    icon: Sparkles,
    name: "Full Grooming Package",
    price: "$75",
    description: "Haircut, beard trim, hot towel shave, and a relaxing scalp massage.",
    popular: true,
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=400&fit=crop"
  },
  {
    icon: Scissors,
    name: "Beard Trim & Line Up",
    price: "$25",
    description: "Precision shaping, trimming, and conditioning for your beard.",
    popular: false,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop"
  },
  {
    icon: Sparkles,
    name: "Skin Fade",
    price: "$40",
    description: "Seamless precision fade down to the skin for a sharp, clean look.",
    popular: false,
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=400&fit=crop"
  },
  {
    icon: Droplets,
    name: "Kids Haircut (Under 12)",
    price: "$25",
    description: "Patience and care for the little gents to keep them looking sharp.",
    popular: false,
    image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=600&h=400&fit=crop"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-primary block"></span>
            <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Our Artistry</span>
            <span className="w-8 h-[2px] bg-primary block"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Premium Services</h2>
          <p className="text-lg text-muted-foreground">
            Experience the finest grooming services. Every detail is meticulously crafted to ensure you look and feel your absolute best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`group flex flex-col p-8 rounded-2xl border transition-all hover:shadow-xl ${
                service.popular ? 'border-primary/30 bg-card hover:border-primary/50' : 'border-border bg-white hover:border-border/80'
              }`}
            >
              {service.image && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
                  <Image 
                    src={service.image} 
                    alt={service.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                {service.popular && (
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
                <span className="text-2xl font-serif font-bold text-primary">{service.price}</span>
              </div>
              
              <p className="text-muted-foreground mb-8 flex-grow">
                {service.description}
              </p>
              
              <Button className="w-full bg-foreground hover:bg-foreground/90 text-white font-bold h-12 rounded-sm group-hover:bg-primary transition-colors">
                Book This Service
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
