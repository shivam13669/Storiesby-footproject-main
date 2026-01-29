import { Car, Building2, Coffee, MapPin } from "lucide-react";
import type { DestinationPackage, Destination } from "@/data/destinations";

interface PackageInfoProps {
  travelPackage: DestinationPackage;
  destination: Destination;
}

const PackageInfo = ({ travelPackage, destination }: PackageInfoProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
        {travelPackage.name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="badge-duration inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
          {travelPackage.duration}
        </span>
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
            <span className="text-sm font-medium">Meals Included</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">{destination.region}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageInfo;
