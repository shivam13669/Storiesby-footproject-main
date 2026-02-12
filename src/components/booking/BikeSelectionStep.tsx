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
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">No bikes available for this package.</p>
      </div>
    );
  }

  const handleBikeSelect = (bikeId: string) => {
    onFormDataChange({ selectedBikeId: bikeId });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Select Your Bike</h2>
        <p className="text-gray-600 mb-8">
          Choose the bike that suits your riding experience and comfort level
        </p>

        <div className="space-y-4">
          {travelPackage.bikes.map((bike) => {
            const bikePrice = Math.round(basePrice * bike.priceMultiplier);
            const priceDifference = bikePrice - basePrice;
            const isSelected = formData.selectedBikeId === bike.id;

            return (
              <div
                key={bike.id}
                onClick={() => handleBikeSelect(bike.id)}
                className={`cursor-pointer rounded-lg border-2 transition-all overflow-hidden ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-300 bg-white hover:border-blue-400 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Bike Image */}
                  <div className="md:w-48 h-48 md:h-auto overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bike Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {bike.name}
                          </h3>
                          <span className="text-xs font-bold px-2 py-1 bg-gray-200 text-gray-700 rounded">
                            {bike.cc}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {bike.description}
                        </p>
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="ml-4 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="grid grid-cols-2 gap-2">
                        {bike.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Price per rider
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{bikePrice.toLocaleString("en-IN")}
                        </p>
                        {priceDifference !== 0 && (
                          <p
                            className={`text-sm font-semibold mt-1 ${
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

                      {isSelected && (
                        <div className="text-right">
                          <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm">
                            Selected
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="font-bold text-blue-900 mb-4">What's Included</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Helmets, spare parts, and first-aid kits</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Professional mechanics and backup vehicles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Comprehensive insurance coverage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Price varies based on bike model</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BikeSelectionStep;
