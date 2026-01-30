"use client";

import React, { useEffect, useRef } from "react";

const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
};

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Photographer",
    location: "New Delhi, India",
    trip: "Ladakh Himalayan Ride",
    quote:
      "StoriesByFoot turned the intimidating Himalayas into a dream ride. Every halt had hot chai, every route had a backup plan, and they never stopped surprising us with hidden gems.",
    highlight: "Altitude 17,982 ft",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Product Manager",
    location: "Bengaluru, India",
    trip: "Arunachal Riverine Expedition",
    quote:
      "From bamboo homestays to private rafting sessions, the itinerary was a perfect blend of thrill and serenity. Their crew felt like family by the end of the trip.",
    highlight: "8-day guided trail",
    rating: 5,
  },
  {
    name: "Kabir Singh",
    role: "Entrepreneur",
    location: "Mumbai, India",
    trip: "Spiti Valley Convoy",
    quote:
      "I have done a dozen driving expeditions, but none matched the precision of StoriesByFoot. The lead marshals navigated blizzards like pros and kept morale sky high.",
    highlight: "12 vehicles in convoy",
    rating: 4,
  },
  {
    name: "Lara Dsouza",
    role: "Yoga Instructor",
    location: "Goa, India",
    trip: "Sikkim Wellness Retreat",
    quote:
      "Sunrise meditations, organic breakfasts, and mindful hikes. They curated every little detail so I could focus on teaching and soaking in the mountains.",
    highlight: "Daily guided rituals",
    rating: 5,
  },
  {
    name: "Vikram Reddy",
    role: "Software Engineer",
    location: "Hyderabad, India",
    trip: "Rajasthan Desert Safari",
    quote:
      "Disconnecting from code and connecting with nature was exactly what I needed. The camel rides under starlit skies, bonfire stories, and the expertise of local guides made this journey truly magical.",
    highlight: "5-night desert camp",
    rating: 5,
  },
  {
    name: "Priya Malhotra",
    role: "Journalist",
    location: "Delhi, India",
    trip: "Northeast Stories Trail",
    quote:
      "As a travel writer, I've explored many regions, but the storytelling approach of StoriesByFoot was exceptional. They don't just guide you through destinations, they unveil the soul of each place through authentic local connections.",
    highlight: "Culture-immersive journey",
    rating: 5,
  },
];

const TestimonialsCarousel: React.FC = () => {
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tracks = trackRefs.current;

    const runners = tracks.map((track, i) => {
      if (!track) return null;

      let y = 0;
      const speed = 0.25 + i * 0.05;

      const run = () => {
        y += speed;
        if (y >= track.scrollHeight / 2) y = 0;
        track.style.transform = `translateY(-${y}px)`;
        return requestAnimationFrame(run);
      };

      return run();
    });

    return () => {
      runners.forEach((id) => {
        if (id !== null) cancelAnimationFrame(id);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shared memories that stay
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from explorers who trusted StoriesByFoot for their unforgettable adventures.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((colIndex) => (
              <div key={colIndex} className="h-[520px] overflow-hidden relative group">
                {/* Top fade */}
                <div className="absolute top-0 left-0 right-0 h-[70px] bg-gradient-to-b from-background via-background to-transparent z-10 pointer-events-none" />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-gradient-to-t from-background via-background to-transparent z-10 pointer-events-none" />

                <div
                  ref={(el) => {
                    trackRefs.current[colIndex] = el;
                  }}
                  className="flex flex-col gap-[18px]"
                >
                  {[...testimonials, ...testimonials].map((testimonial, idx) => (
                    <div
                      key={`${colIndex}-${idx}`}
                      className="bg-gradient-to-b from-white to-green-50 p-[22px] rounded-[18px] border border-green-200/30 shadow-sm flex-shrink-0"
                      style={{
                        minHeight: "auto",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="text-2xl text-green-300">❝</span>
                        <span className="text-yellow-400 tracking-wider text-sm">
                          {Array(testimonial.rating).fill("★").join("")}
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        "{testimonial.quote}"
                      </p>

                      <div className="inline-block px-3 py-1 rounded-full bg-green-100 border border-green-300 text-green-700 text-xs font-medium mb-4">
                        {testimonial.trip}
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-500 text-white flex items-center justify-center font-semibold text-sm">
                          {getInitials(testimonial.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-sm truncate">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-500 text-xs truncate">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
