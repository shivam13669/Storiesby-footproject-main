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

    </div>
  );
};

export default ItinerarySection;
