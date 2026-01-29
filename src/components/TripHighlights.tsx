const highlights = [
  "Discover Iceland's rugged charm, from Reykjavik's vibrant city life to Akureyri's scenic beauty, creating unforgettable experiences.",
  "Witness the awe-inspiring Geysir, where the geothermal wonder erupts with dramatic bursts of steam and water, offering a glimpse into Earth's natural power.",
  "Enjoy a whale watching adventure, where you'll encounter these majestic giants in their natural habitat and marvel at their playful behavior.",
  "Marvel at the stunning Jokulsarlon Glacier Lagoon, where colossal icebergs drift serenely through the crystal-clear waters.",
  "Visit Lake Myvatn, where unique volcanic landscapes and geothermal wonders create a surreal setting for relaxing walks.",
];

const TripHighlights = () => {
  return (
    <div className="mb-8 border-t border-border pt-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">Trip Highlights</h2>
      <ul className="space-y-3">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-2 text-muted-foreground">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripHighlights;
