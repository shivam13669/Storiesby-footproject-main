import { Images } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  destinationName: string;
}

const ImageGallery = ({ images, destinationName }: ImageGalleryProps) => {
  if (!images.length) return null;

  const [main, ...rest] = images;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-6">
      {/* Main Image */}
      <div className="lg:col-span-2 relative rounded-lg overflow-hidden h-[300px] md:h-[450px]">
        <img
          src={main}
          alt={`${destinationName} main view`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Side Grid */}
      <div className="grid grid-cols-2 gap-2">
        {rest.slice(0, 3).map((img, idx) => (
          <div key={idx} className="relative rounded-lg overflow-hidden h-[145px] md:h-[220px]">
            <img
              src={img}
              alt={`${destinationName} gallery ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {rest.length > 3 && (
          <div className="relative rounded-lg overflow-hidden h-[145px] md:h-[220px]">
            <img
              src={rest[3]}
              alt="View all images"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <button className="absolute bottom-3 right-3 flex items-center gap-2 bg-background text-foreground px-3 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors">
              <Images className="w-4 h-4" />
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
