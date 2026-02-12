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

      <div className="space-y-4">
        {travelPackage.bikes.map((bike) => {
          const bikePrice = Math.round(basePrice * bike.priceMultiplier);
          const priceDifference = bikePrice - basePrice;
          const isSelected = formData.selectedBikeId === bike.id;

          return (
            <div
              key={bike.id}
              onClick={() => handleBikeSelect(bike.id)}
              className={`group cursor-pointer rounded-xl border-2 transition-all overflow-hidden ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Bike Image */}
                <div className="md:w-64 h-64 md:h-auto overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Bike Details */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Header with selection indicator */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-foreground">
                            {bike.name}
                          </h3>
                          <span className="text-sm font-semibold px-3 py-1 bg-muted rounded-full text-muted-foreground">
                            {bike.cc}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {bike.description}
                        </p>
                      </div>

                      {/* Selection Indicator */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-border group-hover:border-primary/50"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Features
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {bike.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-end justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        Price per rider
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        ₹{bikePrice.toLocaleString("en-IN")}
                      </p>
                      {priceDifference !== 0 && (
                        <p
                          className={`text-sm font-medium mt-1 ${
                            priceDifference > 0
                              ? "text-orange-600"
                              : "text-green-600"
                          }`}
                        >
                          {priceDifference > 0 ? "+" : ""}₹
                          {priceDifference.toLocaleString("en-IN")} from base
                        </p>
                      )}
                    </div>

                    {/* Selection Button Text */}
                    {isSelected && (
                      <div className="text-right">
                        <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm">
                          Selected
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">About the bikes</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All bikes come with helmets, spare parts, and first-aid kits</li>
          <li>• Professional mechanics and backup vehicles included</li>
          <li>• Comprehensive insurance coverage provided</li>
          <li>• Price varies based on bike model and performance</li>
        </ul>
      </div>
    </div>
  );
};

export default BikeSelectionStep;
