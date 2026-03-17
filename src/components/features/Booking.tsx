// src/components/features/Booking.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Scissors, User, ArrowRight, CheckCircle2 } from "lucide-react";

export function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: ""
  });

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(s => Math.min(s + 1, 4));
  };

  return (
    <section id="book" className="py-24 bg-foreground relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-32" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Reserve Your Chair</h2>
          <p className="text-gray-400 max-w-xl">
            Book your next appointment in three simple steps. We respect your time.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Progress Sidebar */}
          <div className="bg-gray-50 border-r border-border p-8 md:w-64 hidden md:block">
            <div className="space-y-8">
              {[
                { s: 1, label: "Select Service", icon: Scissors },
                { s: 2, label: "Date & Time", icon: CalendarIcon },
                { s: 3, label: "Your Details", icon: User }
              ].map((item) => (
                <div key={item.s} className={`flex items-center gap-4 ${step === item.s ? 'text-primary' : step > item.s ? 'text-foreground' : 'text-muted-foreground opacity-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step === item.s ? 'border-primary bg-primary/10' : step > item.s ? 'border-foreground bg-foreground text-white' : 'border-current'
                  }`}>
                    {step > item.s ? <CheckCircle2 className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
                  </div>
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="p-8 md:p-12 flex-1">
            <form onSubmit={handleNext}>
              
              {/* Step 1: Service */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-bold text-foreground mb-6">What do you need?</h3>
                  <div className="space-y-3">
                    {["Classic Haircut", "Skin Fade", "Hot Towel Shave", "Full Grooming Package"].map(service => (
                      <label 
                        key={service} 
                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50 ${
                          formData.service === service ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border'
                        }`}
                      >
                        <span className="font-semibold text-foreground tracking-wide">{service}</span>
                        <input 
                          type="radio" 
                          name="service"
                          className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
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
                    className="w-full mt-8 bg-foreground hover:bg-black text-white h-14 text-lg font-bold rounded-sm group disabled:opacity-50"
                    disabled={!formData.service}
                  >
                    Continue <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-bold text-foreground mb-6">When works for you?</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Select Date</label>
                    <input 
                      type="date" 
                      className="w-full border-2 border-border rounded-xl p-4 text-foreground font-semibold focus:border-primary outline-none transition-colors"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Available Times</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"].map(time => (
                        <label 
                          key={time}
                          className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer text-sm font-semibold transition-all hover:border-primary/50 ${
                            formData.time === time ? 'border-primary bg-primary text-white' : 'border-border text-foreground'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="time"
                            className="hidden"
                            value={time}
                            checked={formData.time === time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            required
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <Button 
                      onClick={() => setStep(1)} 
                      type="button"
                      variant="outline"
                      className="w-1/3 h-14 text-base font-bold rounded-sm border-2"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-2/3 flex-1 bg-foreground hover:bg-black text-white h-14 text-lg font-bold rounded-sm group disabled:opacity-50"
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
                  <h3 className="text-2xl font-bold text-foreground mb-6">Final Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full border-2 border-border rounded-xl p-4 text-foreground font-semibold focus:border-primary outline-none transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="(555) 000-0000"
                        className="w-full border-2 border-border rounded-xl p-4 text-foreground font-semibold focus:border-primary outline-none transition-colors"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="mt-8 bg-muted p-4 rounded-xl border border-border">
                    <p className="text-sm font-semibold text-foreground mb-1">{formData.service}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-3 h-3" /> {formData.date}
                      <span className="mx-1">•</span>
                      <Clock className="w-3 h-3" /> {formData.time}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <Button 
                      onClick={() => setStep(2)} 
                      type="button"
                      variant="outline"
                      className="w-1/3 h-14 text-base font-bold rounded-sm border-2"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-2/3 flex-1 bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold rounded-sm group disabled:opacity-50"
                      disabled={!formData.name || !formData.phone}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              )}

              {/* Success */}
              {step === 4 && (
                <div className="animate-in zoom-in duration-500 text-center py-10">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-4">You're All Set!</h3>
                  <p className="text-muted-foreground mb-8">
                    Your appointment for {formData.service} on {formData.date} at {formData.time} is confirmed. We've sent a text to {formData.phone}.
                  </p>
                  <Button 
                    onClick={() => {
                      setStep(1);
                      setFormData({ service: "", date: "", time: "", name: "", phone: "" });
                    }} 
                    variant="outline"
                    className="h-12 px-8 font-bold border-2 rounded-sm"
                  >
                    Book Another
                  </Button>
                </div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
