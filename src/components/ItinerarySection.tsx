import ItineraryCarousel from "./ItineraryCarousel";
import ItineraryDay from "./ItineraryDay";

interface ItinerarySectionProps {
  images: string[];
  days: number;
}

const ItinerarySection = ({ images, days }: ItinerarySectionProps) => {
  // Create sample itinerary days based on the number of days
  const itineraryDays = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: i === 0 ? "Arrival & Orientation" : i === days - 1 ? "Departure" : `Explore & Experience Day ${i}`,
    description:
      i === 0
        ? "Welcome to the destination! Get settled, explore the local area, and prepare for the adventure ahead."
        : i === days - 1
        ? "Enjoy your last moments before departure. Transfer to airport with unforgettable memories."
        : `Dive into local culture, explore scenic landscapes, and create unforgettable memories.`,
  }));

  // Split into 2 locations: first half and second half
  const midpoint = Math.ceil(days / 2);
  const firstLocationDays = itineraryDays.slice(0, midpoint);
  const secondLocationDays = itineraryDays.slice(midpoint);

  return (
    <div>
      {/* First Location */}
      {firstLocationDays.length > 0 && (
        <div>
          <ItineraryCarousel
            images={images.slice(0, Math.min(4, images.length))}
            days={firstLocationDays.length}
            location="Primary Destination"
            totalImages={images.length}
          />
          {firstLocationDays.map((item) => (
            <ItineraryDay
              key={item.day}
              day={item.day}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      )}

      {/* Second Location */}
      {secondLocationDays.length > 0 && (
        <div className="mt-8">
          <ItineraryCarousel
            images={images.slice(Math.min(4, images.length))}
            days={secondLocationDays.length}
            location="Secondary Destination"
            totalImages={images.length}
          />
          {secondLocationDays.map((item) => (
            <ItineraryDay
              key={item.day}
              day={item.day}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      )}

      {/* End of Trip */}
      <div className="text-center py-12 border-t border-border mt-8">
        <h3 className="text-4xl md:text-5xl script-font text-gold">End Of Trip</h3>
      </div>
    </div>
  );
};

export default ItinerarySection;
