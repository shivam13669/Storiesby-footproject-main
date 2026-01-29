import { useState } from "react";
import { ChevronDown, ChevronUp, Bus, MapPin, Building2, Star, Download } from "lucide-react";
import icelandStays from "@/assets/iceland-stays.jpg";
import icelandActivity from "@/assets/iceland-activity.jpg";
import reykjavikImg from "@/assets/reykjavik-itinerary.jpg";

interface TransferInfo {
  type: string;
  vehicle: string;
  from: string;
  to: string;
  stops?: number;
}

interface StayInfo {
  name: string;
  stars: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  images: string[];
}

interface Experience {
  image: string;
  title: string;
}

interface ItineraryDayProps {
  day: number;
  title: string;
  description?: string;
  transfer?: TransferInfo;
  stay?: StayInfo;
  experiences?: Experience[];
}

const ItineraryDay = ({ day, title, description, transfer, stay, experiences }: ItineraryDayProps) => {
  const [isOpen, setIsOpen] = useState(day === 1);

  return (
    <div className="border border-border rounded-lg mb-3 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="badge-day">DAY {day}</span>
          <span className="font-medium text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-6">
          {/* Description */}
          {description && (
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          )}

          {/* Transfer Section */}
          {transfer && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bus className="w-4 h-4" />
                <span className="text-sm">{transfer.type}</span>
              </div>
              <h4 className="font-semibold text-foreground">Transfer in {transfer.vehicle}</h4>
              
              <div className="relative pl-6 space-y-4">
                {/* From */}
                <div className="relative">
                  <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="border border-border rounded-lg p-3">
                    <span className="text-xs text-primary font-medium">From</span>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{transfer.from}</span>
                    </div>
                  </div>
                </div>

                {/* Connecting line */}
                <div className="absolute left-[-16px] top-8 bottom-8 w-0.5 bg-border" />

                {/* Stops */}
                {transfer.stops && (
                  <div className="text-center">
                    <a href="#" className="text-primary text-sm hover:underline">↕ View {transfer.stops} Stop</a>
                  </div>
                )}

                {/* To */}
                <div className="relative">
                  <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="border border-border rounded-lg p-3">
                    <span className="text-xs text-primary font-medium">To</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{transfer.to}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stay Section */}
          {stay && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">Stay At</span>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">Stay At {stay.name}</h4>
                <div className="flex">
                  {[...Array(stay.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>

              {/* Check in/out timeline */}
              <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                <div>
                  <span className="text-xs text-muted-foreground">Check In</span>
                  <p className="font-medium text-foreground">{stay.checkIn}</p>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 px-4">
                  <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
                  <span className="text-sm text-muted-foreground bg-background px-2 flex items-center gap-1">
                    {stay.nights}N 🌙
                  </span>
                  <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Check Out</span>
                  <p className="font-medium text-foreground">{stay.checkOut}</p>
                </div>
              </div>

              {/* Hotel images */}
              <div className="flex gap-2 relative">
                {stay.images.slice(0, 3).map((img, idx) => (
                  <div key={idx} className={`rounded-lg overflow-hidden ${idx === 0 ? 'flex-[2]' : 'flex-1'}`}>
                    <img src={img} alt="Hotel" className="w-full h-32 object-cover" />
                  </div>
                ))}
                {/* Download button */}
                <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-background shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
                  <Download className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          )}

          {/* Experiences Section */}
          {experiences && experiences.length > 0 && (
            <div className="space-y-3 bg-gradient-to-r from-primary/5 to-primary/10 -mx-5 px-5 py-4">
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-semibold text-foreground">Enrich Your Day With Experiences</h4>
                <span className="text-primary">✓</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Fill up your day with some of the <span className="text-primary font-medium">highly recommended</span> experiences.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="rounded-lg overflow-hidden">
                      <img src={exp.image} alt={exp.title} className="w-full h-32 object-cover" />
                    </div>
                    <p className="font-medium text-foreground text-sm">{exp.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItineraryDay;
