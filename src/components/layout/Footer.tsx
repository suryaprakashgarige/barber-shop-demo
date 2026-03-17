// src/components/layout/Footer.tsx
import { MapPin, Phone, Clock, Scissors } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
                <Scissors className="text-white w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                The<span className="text-primary">Groom</span>Room
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium grooming for the modern gentleman. Where traditional techniques meet contemporary style.
            </p>
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">
                IG
              </span>
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">
                FB
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary w-5 h-5 flex-shrink-0" />
                <span>123 Grooming Blvd, Suite 100<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-primary w-5 h-5 flex-shrink-0" />
                <span>(555) 012-3456</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6">Hours</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex justify-between"><span>Mon - Fri</span> <span>9:00 AM - 8:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>9:00 AM - 6:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="text-primary font-bold">Closed</span></li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <div className="w-full h-40 bg-zinc-900 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1709493645000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 hover:opacity-100 transition-opacity"
              ></iframe>
              <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
          <p>© 2026 The Groom Room. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
