import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { BookingFormData } from "@/pages/BookingPage";
import { DestinationPackage } from "@/data/destinations";
import { parsePrice } from "@/context/CurrencyContext";
import { useState, useRef, useEffect } from "react";

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
  const [scrollPosition, setScrollPosition] = useState(0);
  // Default to solo when no co-travelers, otherwise use formData preference
  const defaultSeating = formData.guests.length === 0 ? "solo" : (formData.seatingPreference || "solo");
  const [seatingPreference, setSeatingPreference] = useState<"solo" | "dual-sharing" | "seat-in-backup">(
    defaultSeating as "solo" | "dual-sharing" | "seat-in-backup"
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const backupVehicleCardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to backup vehicle when it's selected
  useEffect(() => {
    if (formData.selectedBikeId === "seat-in-backup" && backupVehicleCardRef.current && scrollContainerRef.current) {
      // Scroll the backup vehicle card into view
      backupVehicleCardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "end" });
    }
  }, [formData.selectedBikeId]);

  if (!travelPackage.bikes || travelPackage.bikes.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow-md">
        <p className="text-gray-600">No bikes available for this package.</p>
      </div>
    );
  }

  // Check if this is trans-himalayan package
  const isTransHimalayan = travelPackage.slug === "trans-himalayan-ride";

  // Filter out backup vehicle from regular bikes, get it separately
  const regularBikes = travelPackage.bikes?.filter(bike => !bike.isBackupVehicle) || [];
  const backupVehicle = travelPackage.bikes?.find(bike => bike.isBackupVehicle);

  const getBikePrice = (bike: any) => {
    // For backup vehicle with seating prices
    if (bike.isBackupVehicle && bike.seatingPrices && seatingPreference in bike.seatingPrices) {
      return bike.seatingPrices[seatingPreference];
    }
    // For trans-himalayan ride, use seating-based prices if available
    if (isTransHimalayan && bike.seatingPrices && seatingPreference in bike.seatingPrices) {
      return bike.seatingPrices[seatingPreference];
    }
    // Otherwise use the traditional multiplier method
    return Math.round(basePrice * (bike.priceMultiplier || 1.0));
  };

  const handleBikeSelect = (bikeId: string) => {
    // If selecting a bike other than "seat-in-backup", reset seating preference to solo
    if (bikeId !== "seat-in-backup") {
      setSeatingPreference("solo");
      onFormDataChange({ selectedBikeId: bikeId, seatingPreference: "solo" });
    } else {
      onFormDataChange({ selectedBikeId: bikeId });
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newPosition = direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
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

      {/* All in One Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all p-8 space-y-8">
        {/* Bikes Selection Section */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4 pb-3 border-b border-gray-200">
            Select Your Preferred Bike
          </h3>

          {isTransHimalayan ? (
            // Carousel for Trans-Himalayan
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all -ml-4"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              {/* Carousel Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
                style={{ scrollBehavior: 'smooth' }}
              >
                {/* Own Bike Option */}
                <div
                  onClick={() => handleBikeSelect("own-bike")}
                  className={`flex-shrink-0 w-80 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 cursor-pointer relative group overflow-hidden border-2 ${
                    formData.selectedBikeId === "own-bike"
                      ? "border-blue-600 shadow-md bg-blue-50"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  {/* Selection Badge */}
                  {formData.selectedBikeId === "own-bike" && (
                    <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5" />
                    </div>
                  )}

                  {/* Image Section */}
                  <div className="relative overflow-hidden rounded-xl mb-4 h-52 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-2">🏍️</div>
                      <p className="text-gray-700 font-semibold">Your Own Bike</p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Own Bike
                      </h3>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mt-1">
                        Bring Your Own
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      Ride with your own motorcycle on this adventure
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">Complete freedom</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">Familiar machine</span>
                      </li>
                    </ul>

                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                        Price per traveler
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{basePrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          ✓ EARLY BIRD OFFER!
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBikeSelect("own-bike")}
                      className={`w-full mt-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        formData.selectedBikeId === "own-bike"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {formData.selectedBikeId === "own-bike" ? "✓ Selected" : "Select Bike"}
                    </button>
                  </div>
                </div>

                {/* Provided Bikes */}
                {regularBikes.map((bike) => {
                  const bikePrice = getBikePrice(bike);
                  const priceDifference = bikePrice - basePrice;
                  const isSelected = formData.selectedBikeId === bike.id;

                  return (
                    <div
                      key={bike.id}
                      onClick={() => handleBikeSelect(bike.id)}
                      className={`flex-shrink-0 w-80 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 cursor-pointer relative group overflow-hidden border-2 ${
                        isSelected
                          ? "border-blue-600 shadow-md bg-blue-50"
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
                      <div className="relative overflow-hidden rounded-xl mb-4 h-52 bg-gray-200 flex items-center justify-center">
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="w-full h-full object-contain"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-blue-600/20" />
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {bike.name}
                          </h3>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mt-1">
                            {bike.cc}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {bike.description}
                        </p>

                        <ul className="space-y-2">
                          {bike.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                            Price per traveler
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{bikePrice.toLocaleString("en-IN")}
                            </span>
                            {priceDifference !== 0 && (
                              <span
                                className={`text-sm font-semibold ${
                                  priceDifference > 0
                                    ? "text-green-600"
                                    : "text-green-600"
                                }`}
                              >
                                {priceDifference > 0 ? "✓ EARLY BIRD OFFER!" : ""}
                              </span>
                            )}
                          </div>
                        </div>

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

                {/* Seat in Backup Vehicle - Info Only, Select via Seating Preference */}
                {backupVehicle && (
                  <div
                    ref={backupVehicleCardRef}
                    className={`flex-shrink-0 w-80 bg-gray-50 rounded-2xl shadow-sm p-5 relative group overflow-hidden border-2 ${
                      formData.selectedBikeId === backupVehicle.id
                        ? "border-blue-600 shadow-md bg-blue-50"
                        : "border-gray-200 opacity-75"
                    }`}
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden rounded-xl mb-4 h-52 bg-gray-200 flex items-center justify-center">
                      <img
                        src={backupVehicle.image}
                        alt={backupVehicle.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details Section */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {backupVehicle.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {backupVehicle.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-4">
                        {backupVehicle.features?.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-blue-600">•</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                          Price per traveler
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{getBikePrice(backupVehicle).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 italic mt-4 text-center">
                        Select via Seating Preference below
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => handleScroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all -mr-4"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          ) : (
            // Grid layout for other packages
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularBikes.map((bike) => {
                const bikePrice = getBikePrice(bike);
                const priceDifference = bikePrice - basePrice;
                const isSelected = formData.selectedBikeId === bike.id;

                return (
                  <div
                    key={bike.id}
                    onClick={() => handleBikeSelect(bike.id)}
                    className={`bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 cursor-pointer relative group overflow-hidden border-2 ${
                      isSelected
                        ? "border-blue-600 shadow-md bg-blue-50"
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
                    <div className="relative overflow-hidden rounded-xl mb-4 h-52 bg-gray-200 flex items-center justify-center">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-full object-contain"
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
                          Price per traveler
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{bikePrice.toLocaleString("en-IN")}
                          </span>
                          {priceDifference !== 0 && (
                            <span
                              className={`text-sm font-semibold text-green-600`}
                            >
                              {priceDifference > 0 ? "✓ EARLY BIRD OFFER!" : ""}
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

              {/* Seat in Backup Vehicle - Info Only, Select via Seating Preference */}
              {backupVehicle && (
                <div
                  className={`bg-gray-50 rounded-2xl shadow-sm p-5 relative group overflow-hidden border-2 ${
                    formData.selectedBikeId === backupVehicle.id
                      ? "border-blue-600 shadow-md bg-blue-50"
                      : "border-gray-200 opacity-75"
                  }`}
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden rounded-xl mb-4 h-52 bg-gray-200 flex items-center justify-center">
                    <img
                      src={backupVehicle.image}
                      alt={backupVehicle.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details Section */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {backupVehicle.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {backupVehicle.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {backupVehicle.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-blue-600">•</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price Section */}
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                        Price per traveler
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{getBikePrice(backupVehicle).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 italic mt-4 text-center">
                      Select via Seating Preference below
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* What's Included Section */}
        <div>
          <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4 pb-3 border-b border-gray-200">
            What's Included
          </h4>
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
                <p className="text-xs text-gray-600 mt-1">
                  {isTransHimalayan
                    ? "Mechanic, marshall, sweep rider & backup vehicles"
                    : "Mechanic, marshall & backup vehicles"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-1">{isTransHimalayan ? "🎫" : "🚗"}</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {isTransHimalayan ? "Permit and Bonfire" : "Pickup & Drop"}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {isTransHimalayan ? "Inner Line Permit, Bonfire music" : "Airport transfers included"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-1">{isTransHimalayan ? "🏥" : "⛽"}</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {isTransHimalayan ? "First Aid & Oxygen" : "Fuel & Oxygen"}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {isTransHimalayan ? "First Aid and emergency oxygen" : "Bike fuel and emergency oxygen"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seating Preference - Show for all packages */}
        <div>
          <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4 pb-3 border-b border-gray-200">
            Seating Preference
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            {formData.guests && formData.guests.length > 0
              ? "Choose how your co-traveller will ride"
              : "Select your preferred seating arrangement"}
          </p>
          <div className="space-y-3">
            {/* Show DUAL SHARING only when co-travellers are added */}
            {formData.guests && formData.guests.length > 0 && (
              <label className="flex items-center gap-3 p-3 border-2 rounded-lg hover:border-blue-400 cursor-pointer transition-all"
                style={{borderColor: seatingPreference === "dual-sharing" ? "#2563eb" : "#d1d5db"}}>
                <input
                  type="radio"
                  name="seating"
                  value="dual-sharing"
                  checked={seatingPreference === "dual-sharing"}
                  onChange={(e) => {
                    setSeatingPreference(e.target.value as any);
                    onFormDataChange({ seatingPreference: e.target.value as any });
                  }}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">Dual Sharing</p>
                  <p className="text-xs text-gray-600">Your co-traveller rides with you</p>
                </div>
              </label>
            )}
            <label className="flex items-center gap-3 p-3 border-2 rounded-lg hover:border-blue-400 cursor-pointer transition-all"
              style={{borderColor: seatingPreference === "solo" ? "#2563eb" : "#d1d5db"}}>
              <input
                type="radio"
                name="seating"
                value="solo"
                checked={seatingPreference === "solo"}
                onChange={(e) => {
                  setSeatingPreference(e.target.value as any);
                  onFormDataChange({ seatingPreference: e.target.value as any });
                }}
                className="w-4 h-4"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">Solo</p>
                <p className="text-xs text-gray-600">
                  {formData.guests && formData.guests.length > 0
                    ? "Your co-traveller gets their own bike"
                    : "Get your own bike"}
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border-2 rounded-lg hover:border-blue-400 cursor-pointer transition-all"
              style={{borderColor: seatingPreference === "seat-in-backup" ? "#2563eb" : "#d1d5db"}}>
              <input
                type="radio"
                name="seating"
                value="seat-in-backup"
                checked={seatingPreference === "seat-in-backup"}
                onChange={(e) => {
                  const value = e.target.value as any;
                  setSeatingPreference(value);
                  onFormDataChange({ seatingPreference: value });
                  // When Seat in Backup is selected, also select the backup vehicle bike
                  handleBikeSelect("seat-in-backup");
                }}
                className="w-4 h-4"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">Seat in Backup</p>
                <p className="text-xs text-gray-600">
                  {formData.guests && formData.guests.length > 0
                    ? "Your co-traveller rides in backup vehicle"
                    : "Ride in backup vehicle"}
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeSelectionStep;
