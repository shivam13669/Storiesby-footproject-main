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
      <div className="bg-white rounded-xl p-8 text-center shadow-md">
        <p className="text-gray-600">No bikes available for this package.</p>
      </div>
    );
  }

  const handleBikeSelect = (bikeId: string) => {
    onFormDataChange({ selectedBikeId: bikeId });
  };

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Select Your Bike</h2>
        <p className="text-gray-600">
          Choose the bike that suits your riding experience and comfort level
        </p>
      </div>

      {/* Bikes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelPackage.bikes.map((bike) => {
          const bikePrice = Math.round(basePrice * bike.priceMultiplier);
          const priceDifference = bikePrice - basePrice;
          const isSelected = formData.selectedBikeId === bike.id;

          return (
            <div
              key={bike.id}
              onClick={() => handleBikeSelect(bike.id)}
              className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 cursor-pointer relative group overflow-hidden border-2 ${
                isSelected
                  ? "border-blue-600 shadow-lg"
                  : "border-gray-200 hover:border-blue-400"
              }`}
            >
              {/* Selection Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5" />
                </div>
              )}

              {/* Image Section */}
              <div className="relative overflow-hidden rounded-xl mb-4 h-52 bg-gray-200">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-blue-600/20" />
                )}
              </div>

              {/* Content Section */}
              <div className="space-y-3">
                {/* Name and CC */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {bike.name}
                  </h3>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mt-1">
                    {bike.cc}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {bike.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {bike.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price Section */}
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                    Price per rider
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{bikePrice.toLocaleString("en-IN")}
                    </span>
                    {priceDifference !== 0 && (
                      <span
                        className={`text-sm font-semibold ${
                          priceDifference > 0
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {priceDifference > 0 ? "+" : ""}₹
                        {priceDifference.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handleBikeSelect(bike.id)}
                  className={`w-full mt-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {isSelected ? "✓ Selected" : "Select Bike"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
        <h4 className="font-bold text-gray-900 mb-4">What's Included</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-lg mt-1">🏨</span>
            <div>
              <p className="font-semibold text-sm text-gray-900">Accommodation & Meals</p>
              <p className="text-xs text-gray-600 mt-1">Hotel stays and breakfast/dinner</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg mt-1">👨‍🔧</span>
            <div>
              <p className="font-semibold text-sm text-gray-900">Professional Support</p>
              <p className="text-xs text-gray-600 mt-1">Mechanic, marshall & backup vehicles</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg mt-1">🚗</span>
            <div>
              <p className="font-semibold text-sm text-gray-900">Pickup & Drop</p>
              <p className="text-xs text-gray-600 mt-1">Airport transfers included</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg mt-1">⛽</span>
            <div>
              <p className="font-semibold text-sm text-gray-900">Fuel & Oxygen</p>
              <p className="text-xs text-gray-600 mt-1">Bike fuel and emergency oxygen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seating Option - Only show if co-travellers are added */}
      {formData.guests && formData.guests.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
          <h4 className="font-bold text-gray-900 mb-4">Seating Preference</h4>
          <p className="text-sm text-gray-600 mb-4">Choose how your co-traveller will ride</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-all">
              <input
                type="radio"
                name="seating"
                value="dual-sharing"
                className="w-4 h-4"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">Dual Sharing</p>
                <p className="text-xs text-gray-600">Your co-traveller rides with you</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-all">
              <input
                type="radio"
                name="seating"
                value="solo"
                className="w-4 h-4"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">Solo</p>
                <p className="text-xs text-gray-600">Your co-traveller gets their own bike</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-all">
              <input
                type="radio"
                name="seating"
                value="seat-in-backup"
                className="w-4 h-4"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">Seat in Backup</p>
                <p className="text-xs text-gray-600">Your co-traveller rides in backup vehicle</p>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeSelectionStep;
