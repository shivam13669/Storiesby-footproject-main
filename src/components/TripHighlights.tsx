interface TripHighlightsProps {
  highlights: string[];
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="mb-8 border-t border-border pt-8">
      <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Trip Highlights</h2>
      <ul className="space-y-3">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0 min-w-[6px]" />
            <span className="text-sm">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripHighlights;
