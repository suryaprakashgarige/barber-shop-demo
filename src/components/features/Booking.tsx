// src/components/features/Booking.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Scissors, User, ArrowRight, CheckCircle2, CheckCircle } from "lucide-react";
import emailjs from '@emailjs/browser';

export function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',      // client will replace this
        'YOUR_TEMPLATE_ID',     // client will replace this
        {
          service: formData.service,
          date: formData.date,
          time: formData.time,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        'YOUR_PUBLIC_KEY'       // client will replace this
      );
      setSuccessMessage('Your appointment is confirmed! Check your email.');
      setStep(4);
    } catch (error) {
      setErrorMessage('Booking failed. Please call us directly at (512) 867-3090');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 3) {
      handleBookingSubmit(e);
    } else {
      setStep(s => Math.min(s + 1, 4));
    }
  };

  return (
    <section id="book" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/5 -skew-x-12 translate-x-32" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Reserve Your Chair</h2>
          <p className="text-zinc-400 max-w-xl">
            Book your next appointment and join our VIP list for exclusive grooming tips and 10% off your first cut.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-800">
          
          {/* Progress Sidebar */}
          <div className="bg-zinc-950/50 border-r border-zinc-800 p-8 md:w-64 hidden md:block">
            <div className="space-y-8">
              {[
                { s: 1, label: "Select Service", icon: Scissors },
                { s: 2, label: "Date & Time", icon: CalendarIcon },
                { s: 3, label: "Your Details", icon: User }
              ].map((item) => (
                <div key={item.s} className={`flex items-center gap-4 ${step === item.s ? 'text-amber-500' : step > item.s ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === item.s ? 'border-amber-500 bg-amber-500/10' : step > item.s ? 'border-zinc-500 bg-zinc-800 text-white' : 'border-zinc-700'}`}>
                    {step > item.s ? <CheckCircle2 className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
                  </div>
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="p-8 md:p-12 flex-1 relative">
            {step === 4 ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h3>
                <p className="text-zinc-400 mb-8">
                  We'll see you on {formData.date} at {formData.time}.<br/>
                  {successMessage || "A confirmation email is on its way."}
                </p>
                <div className="flex flex-col gap-3">
                  <a 
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Haircut+at+TheGroomRoom&details=Your+appointment+is+confirmed&location=2847+South+Lamar+Blvd+Austin+TX`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 flex items-center justify-center rounded-sm transition-colors"
                  >
                    Add to Google Calendar
                  </a>
                  <Button onClick={() => setStep(1)} variant="ghost" className="text-zinc-400 hover:text-white">Book Another</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNext}>
                
                {/* Step 1: Service */}
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-2xl font-bold text-white mb-6">What do you need?</h3>
                    <div className="space-y-3">
                      {["Classic Haircut", "Skin Fade", "Hot Towel Shave", "Full Grooming Package"].map(service => (
                        <label 
                          key={service} 
                          className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-amber-500/50 ${formData.service === service ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-800 bg-zinc-950/50'}`}
                        >
                          <span className="font-semibold text-zinc-200 tracking-wide">{service}</span>
                          <input 
                            type="radio" 
                            name="service"
                            className="w-5 h-5 text-amber-500 bg-zinc-900 border-zinc-700 focus:ring-amber-500 focus:ring-offset-zinc-900"
                            value={service}
                            checked={formData.service === service}
                            onChange={(e) => setFormData({...formData, service: e.target.value})}
                            required
                          />
                        </label>
                      ))}
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-zinc-950 h-14 text-lg font-bold rounded-sm group disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500"
                      disabled={!formData.service}
                    >
                      Continue <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                     <h3 className="text-2xl font-bold text-white mb-6">When works for you?</h3>
                     <div className="space-y-6">
                       <div>
                         <label className="block text-sm font-semibold text-zinc-400 mb-2">Select Date</label>
                         <input 
                           type="date" 
                           className="w-full p-4 rounded-xl border-2 border-zinc-800 bg-zinc-950 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                           style={{ colorScheme: 'dark' }}
                           value={formData.date}
                           onChange={(e) => setFormData({...formData, date: e.target.value})}
                           required
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-semibold text-zinc-400 mb-4">Available Times</label>
                         <div className="grid grid-cols-3 gap-3">
                           {["09:00 AM", "10:30 AM", "01:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"].map(time => (
                             <button
                               key={time}
                               type="button"
                               onClick={() => setFormData({...formData, time})}
                               className={`p-3 text-sm font-semibold rounded-lg border-2 transition-all ${formData.time === time ? 'border-amber-500 bg-amber-500 text-zinc-950' : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-amber-500/50 hover:bg-zinc-800'}`}
                             >
                               {time}
                             </button>
                           ))}
                         </div>
                       </div>
                     </div>
                     <div className="flex gap-3 mt-8">
                      <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-14 px-6 text-zinc-400 hover:text-white bg-zinc-800">Back</Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 h-14 text-lg font-bold rounded-sm group disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500"
                        disabled={!formData.date || !formData.time}
                      >
                        Continue <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">Lock it in</h3>
                    <p className="text-zinc-400 mb-6 font-medium">Get 10% off your first visit by joining our VIP list.</p>
                    <div className="space-y-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Full Name"
                          className="w-full p-4 rounded-xl border-2 border-zinc-800 bg-zinc-950 text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Email Address (for VIP discount)"
                          className="w-full p-4 rounded-xl border-2 border-zinc-800 bg-zinc-950 text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          placeholder="Phone Number"
                          className="w-full p-4 rounded-xl border-2 border-zinc-800 bg-zinc-950 text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-8">
                      <Button type="button" variant="ghost" onClick={() => setStep(2)} className="h-14 px-6 text-zinc-400 hover:text-white bg-zinc-800">Back</Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 h-14 text-lg font-bold rounded-sm group disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500"
                        disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Confirm Booking"} <CheckCircle2 className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                    {errorMessage && <p className="mt-4 text-red-500 text-sm text-center">{errorMessage}</p>}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
