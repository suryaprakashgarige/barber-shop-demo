import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Services } from "@/components/marketing/Services";
import { FaceScanner } from "@/components/features/FaceScanner";
import { Gallery } from "@/components/marketing/Gallery";
import { Reviews } from "@/components/marketing/Reviews";
import { Team } from "@/components/marketing/Team";
import { Booking } from "@/components/features/Booking";
import { MobileCTA } from "@/components/ui/MobileCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 lg:pt-0">
        <Hero />
      </div>
      <div className="space-y-0">
        <Services />
        <FaceScanner />
        <Team />
        <Gallery />
        <Reviews />
        <Booking />
      </div>
      <MobileCTA />
      <Footer />
    </main>
  );
}
