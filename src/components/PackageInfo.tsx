import { Car, Building2, Coffee, MapPin } from "lucide-react";

interface PackageInfoProps {
  duration: string;
  title: string;
}

// Helper function to extract day count from duration string
const extractDayCount = (duration: string): number => {
  const match = duration.match(/(\d+)\s*d/i);
  return match ? parseInt(match[1]) : 0;
};

const PackageInfo = ({ duration, title }: PackageInfoProps) => {
  const dayCount = extractDayCount(duration);
  const primaryDays = Math.ceil(dayCount / 2);
  const secondaryDays = dayCount - primaryDays;

  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="badge-duration">{duration}</span>
        {primaryDays > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold text-foreground">{primaryDays}</span>
            <div className="text-sm">
              <span className="text-muted-foreground">Days in</span>
              <p className="font-semibold text-foreground">Primary Destination</p>
            </div>
          </div>
        )}
        {secondaryDays > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold text-foreground">{secondaryDays}</span>
            <div className="text-sm">
              <span className="text-muted-foreground">Days in</span>
              <p className="font-semibold text-foreground">Secondary Destination</p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex flex-wrap gap-6 md:gap-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Car className="w-5 h-5" />
            <span className="text-sm font-medium">Transfer Included</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-5 h-5" />
            <span className="text-sm font-medium">Stay Included</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Coffee className="w-5 h-5" />
            <span className="text-sm font-medium">Breakfast Included</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Sightseeing Included</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageInfo;
