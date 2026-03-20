// src/components/marketing/Reviews.tsx
import { Star } from "lucide-react";

export function Reviews() {
  const reviews = [
    {
      name: "Marcus Rivera",
      date: "2 days ago",
      text: "Best fade I've ever had. The attention to detail and the hot towel shave at the end is next level. Found my new regular spot.",
      note: "Austin, TX"
    },
    {
      name: "Daniel Shaw",
      date: "1 week ago",
      text: "Clean, professional, and they actually listen to what you want. The Face Shape Scanner recommended a cut I never thought of, and it looks amazing.",
      note: "South Lamar regular"
    },
    {
      name: "James Tran",
      date: "2 weeks ago",
      text: "Premium experience from the moment you walk in. Great atmosphere and the barbers are true masters of their craft.",
      note: "Verified Google Review"
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-white border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="text-center md:text-left md:w-1/3">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Client Reviews</h2>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-amber-500">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="fill-current w-6 h-6" />)}
            </div>
            <p className="text-2xl font-bold text-foreground">4.9/5</p>
            <p className="text-muted-foreground">Based on 500+ Google Reviews</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:w-2/3">
            {reviews.map((review, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="flex text-amber-500 mb-4">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="fill-current w-4 h-4" />)}
                </div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">"{review.text}"</p>
                <div className="mt-auto">
                  <p className="font-bold text-foreground text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.note || review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
