import { Check } from "lucide-react";
import { BookingFormData } from "@/pages/BookingPage";
import { DestinationPackage } from "@/data/destinations";
import { parsePrice } from "@/context/CurrencyContext";

interface BikeSelectionStepProps {
  formData: BookingFormData;
  travelPackage: DestinationPackage;
  basePrice: number;
  onFormDataChange: (data: Partial<BookingFormData>) => void;
}

const BikeSelectionStep = ({
  formData,
  travelPackage,
  basePrice,
  onFormDataChange,
}: BikeSelectionStepProps) => {
  if (!travelPackage.bikes || travelPackage.bikes.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <p className="text-muted-foreground">No bikes available for this package.</p>
      </div>
    );
  }

  const handleBikeSelect = (bikeId: string) => {
    onFormDataChange({ selectedBikeId: bikeId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Ride</h2>
        <p className="text-muted-foreground">
          Select the bike that best suits your riding experience and comfort level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelPackage.bikes.map((bike, index) => {
          const bikePrice = Math.round(basePrice * bike.priceMultiplier);
          const priceDifference = bikePrice - basePrice;
          const isSelected = formData.selectedBikeId === bike.id;

          return (
            <div
              key={bike.id}
              onClick={() => handleBikeSelect(bike.id)}
              className={`group cursor-pointer relative transition-all duration-300 transform ${
                isSelected ? "scale-105" : "hover:scale-102"
              }`}
              style={{
                perspective: "1000px",
              }}
            >
              {/* 3D Card Container */}
              <div
                className={`relative h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? "shadow-2xl"
                    : "shadow-lg hover:shadow-3xl"
                }`}
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
                  backdropFilter: "blur(10px)",
                  border: isSelected
                    ? "2px solid rgba(59, 130, 246, 0.5)"
                    : "2px solid rgba(229, 231, 235, 0.6)",
                  boxShadow: isSelected
                    ? "0 20px 60px rgba(59, 130, 246, 0.3), 0 0 1px rgba(59, 130, 246, 0.2)"
                    : "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* Badge - Top Left */}
                {index === 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      BEST FOR BEGINNERS
                    </span>
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      PREMIUM CHOICE
                    </span>
                  </div>
                )}

                {/* Selection Badge - Top Right */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col h-full">
                  {/* Bike Image Section */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    {/* Name and CC */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                        {bike.name}
                      </h3>
                      <div className="inline-block">
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{
                            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)",
                            color: "rgb(59, 130, 246)",
                          }}
                        >
                          {bike.cc}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {bike.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 pb-6 border-b border-gray-200/50">
                      <div className="space-y-2">
                        {bike.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                          Per Rider
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          ₹{bikePrice.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {priceDifference !== 0 && (
                        <div
                          className="p-2 rounded-lg text-xs font-semibold"
                          style={{
                            background:
                              priceDifference > 0
                                ? "rgba(249, 115, 22, 0.1)"
                                : "rgba(34, 197, 94, 0.1)",
                            color:
                              priceDifference > 0
                                ? "rgb(217, 119, 6)"
                                : "rgb(34, 197, 94)",
                          }}
                        >
                          {priceDifference > 0 ? "+" : ""}₹
                          {priceDifference.toLocaleString("en-IN")} from base
                        </div>
                      )}

                      {/* Select Button */}
                      <button
                        onClick={() => handleBikeSelect(bike.id)}
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 text-sm ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {isSelected ? "✓ Selected" : "Select Bike"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div
        className="rounded-2xl p-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%)",
          border: "2px solid rgba(59, 130, 246, 0.2)",
          boxShadow: "0 8px 32px rgba(59, 130, 246, 0.08)",
        }}
      >
        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
          About the Bikes
        </h4>
        <ul className="text-sm text-muted-foreground space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>All bikes come with helmets, spare parts, and first-aid kits</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Professional mechanics and backup vehicles included</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Comprehensive insurance coverage provided</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Price varies based on bike model and performance</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BikeSelectionStep;
