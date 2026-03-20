// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-lg py-0" 
        : "bg-white/90 backdrop-blur-sm border-b border-border py-2"
    }`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
            <Scissors className="text-white w-6 h-6 transform group-hover:-rotate-12 transition-transform" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
            The<span className="text-primary">Groom</span>Room
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-colors uppercase"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+15128673090" className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            (512) 867-3090
          </a>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-sm px-8">
            BOOK NOW
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-border shadow-lg animate-in slide-in-from-top-2 p-4">
          <nav className="flex flex-col gap-4 mb-6">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg font-semibold text-foreground uppercase p-2 hover:bg-muted rounded-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col gap-3">
            <a 
              href="tel:+15128673090" 
              className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-900 text-white font-bold rounded-sm border border-zinc-800"
            >
              <Phone className="w-5 h-5 text-primary" />
              Tap to Call: (512) 867-3090
            </a>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-sm" onClick={() => setIsOpen(false)}>
              BOOK APPOINTMENT NOW
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
