import { Images } from "lucide-react";
import icelandMain from "@/assets/iceland-main.jpg";
import icelandDestinations from "@/assets/iceland-destinations.jpg";
import icelandStays from "@/assets/iceland-stays.jpg";
import icelandActivity from "@/assets/iceland-activity.jpg";
import icelandWaterfall from "@/assets/iceland-waterfall.jpg";

const ImageGallery = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-6">
      {/* Main Image */}
      <div className="lg:col-span-2 relative rounded-lg overflow-hidden h-[300px] md:h-[450px]">
        <img
          src={icelandMain}
          alt="Scenic Iceland"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Side Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Destinations */}
        <div className="relative rounded-lg overflow-hidden h-[145px] md:h-[220px]">
          <img
            src={icelandDestinations}
            alt="Destinations"
            className="w-full h-full object-cover"
          />
          <div className="image-overlay" />
          <span className="absolute bottom-3 left-3 text-primary-foreground font-medium text-sm">
            Destinations
          </span>
        </div>

        {/* Stays */}
        <div className="relative rounded-lg overflow-hidden h-[145px] md:h-[220px]">
          <img
            src={icelandStays}
            alt="Stays"
            className="w-full h-full object-cover"
          />
          <div className="image-overlay" />
          <span className="absolute bottom-3 left-3 text-primary-foreground font-medium text-sm">
            Stays
          </span>
        </div>

        {/* Activity & Sightseeing */}
        <div className="relative rounded-lg overflow-hidden h-[145px] md:h-[220px]">
          <img
            src={icelandActivity}
            alt="Activity & Sightseeing"
            className="w-full h-full object-cover"
          />
          <div className="image-overlay" />
          <span className="absolute bottom-3 left-3 text-primary-foreground font-medium text-sm">
            Activity & Sightseeing
          </span>
        </div>

        {/* View All Images */}
        <div className="relative rounded-lg overflow-hidden h-[145px] md:h-[220px]">
          <img
            src={icelandWaterfall}
            alt="View All"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <button className="absolute bottom-3 right-3 flex items-center gap-2 bg-background text-foreground px-3 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors">
            <Images className="w-4 h-4" />
            View All Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
