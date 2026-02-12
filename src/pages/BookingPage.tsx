import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GuestDetailsStep from "@/components/booking/GuestDetailsStep";
import BikeSelectionStep from "@/components/booking/BikeSelectionStep";
import ConfirmationStep from "@/components/booking/ConfirmationStep";
import { 
  findPackageAcrossDestinations, 
  BikeOption,
  DestinationPackage,
  Destination
} from "@/data/destinations";
import { parsePrice } from "@/context/CurrencyContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export type GuestData = {
  name: string;
  aadhaarNumber: string;
};

export type BookingFormData = {
  // Step 1: Guest Details
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  travelDate: string;
  aadhaarNumber: string;
  guests: GuestData[];
  
  // Step 2: Bike Selection
  selectedBikeId: string;
};

type BookingStep = 1 | 2 | 3;

const BookingPage = () => {
  const { packageSlug } = useParams<{ packageSlug: string }>();
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [validationError, setValidationError] = useState<string>("");

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    travelDate: "",
    aadhaarNumber: "",
    guests: [],
    selectedBikeId: "",
  });

  // Find package data
  let destination: Destination | undefined;
  let travelPackage: DestinationPackage | undefined;

  if (packageSlug) {
    const result = findPackageAcrossDestinations(packageSlug);
    if (result) {
      destination = result.destination;
      travelPackage = result.travelPackage;
    }
  }

  if (!travelPackage || !destination) {
    return <Navigate to="/destinations" replace />;
  }

  // Set default bike on first load
  if (!formData.selectedBikeId && travelPackage.bikes && travelPackage.bikes.length > 0) {
    setFormData(prev => ({ ...prev, selectedBikeId: travelPackage.bikes![0].id }));
  }

  // Calculate price
  const basePrice = parsePrice(travelPackage.price) || 0;
  const selectedBike = travelPackage.bikes?.find(b => b.id === formData.selectedBikeId);
  const priceMultiplier = selectedBike?.priceMultiplier || 1.0;
  const finalPrice = Math.round(basePrice * priceMultiplier);

  const handleStepChange = (step: BookingStep) => {
    setCurrentStep(step);
  };

  const handleFormDataChange = (data: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setValidationError("");
  };

  const handleNextStep = () => {
    setValidationError("");

    if (currentStep === 1) {
      // Validate step 1
      if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.travelDate || !formData.aadhaarNumber) {
        setValidationError("Please fill in all required fields");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.selectedBikeId) {
        setValidationError("Please select a bike");
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as BookingStep);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-4 mt-16">
        {/* Centered Step Indicator */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center gap-8">
            {[1, 2, 3].map((step, idx) => (
              <div key={step} className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      step === currentStep
                        ? "bg-blue-600 text-white shadow-lg scale-110"
                        : step < currentStep
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step < currentStep ? "✓" : step}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 mt-3 text-center whitespace-nowrap">
                    {step === 1 ? "Travel Info" : step === 2 ? "Select Bike" : "Review"}
                  </p>
                </div>
                {idx < 2 && (
                  <div
                    className={`w-12 h-1 transition-all ${
                      step < currentStep ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Checkout Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {/* Left side - Form content */}
          <div className="lg:col-span-2 space-y-0">
            {currentStep === 1 && (
              <GuestDetailsStep
                formData={formData}
                travelPackage={travelPackage}
                onFormDataChange={handleFormDataChange}
              />
            )}

            {currentStep === 2 && (
              <BikeSelectionStep
                formData={formData}
                travelPackage={travelPackage}
                basePrice={basePrice}
                onFormDataChange={handleFormDataChange}
              />
            )}

            {currentStep === 3 && (
              <ConfirmationStep
                formData={formData}
                travelPackage={travelPackage}
                destination={destination}
                selectedBike={selectedBike}
                finalPrice={finalPrice}
              />
            )}

            {/* Validation Error Message */}
            {validationError && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-lg">
                <p className="text-red-700 font-medium text-sm">{validationError}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="flex-1 h-12 text-base font-semibold border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Previous Step
                </button>
              )}
              {currentStep < 3 && (
                <button
                  onClick={handleNextStep}
                  className="flex-1 h-12 text-base font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Next Step
                </button>
              )}
              {currentStep === 3 && (
                <button
                  onClick={handlePrevStep}
                  className="flex-1 h-12 text-base font-semibold border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Edit Details
                </button>
              )}
              {currentStep === 3 && (
                <button
                  className="flex-1 h-12 text-base font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>

          {/* Right side - Booking Summary (Checkout Style) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Booking Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Package Header with Image */}
                <div className="relative h-40 overflow-hidden bg-gray-200">
                  <img
                    src={travelPackage.image || "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1600&q=80"}
                    alt={travelPackage.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 text-white p-4">
                    <h3 className="text-sm font-bold">Booking Summary</h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-6">
                  {/* Title Section */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">
                      {travelPackage.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {travelPackage.duration}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200" />

                  {/* Details Section */}
                  <div className="space-y-3">
                    {formData.travelDate && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Travel Date</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {new Date(formData.travelDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    )}

                    {selectedBike && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Your Bike</span>
                        <span className="text-sm font-semibold text-gray-900 text-right">
                          {selectedBike.name}
                        </span>
                      </div>
                    )}

                    {formData.guests.length > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Co-Travellers</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {formData.guests.length} {formData.guests.length === 1 ? 'person' : 'people'}
                        </span>
                      </div>
                    )}

                    {!formData.travelDate && (
                      <div className="flex justify-between items-center opacity-50">
                        <span className="text-sm text-gray-600">Travel Date</span>
                        <span className="text-sm text-gray-500">Not selected</span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200" />

                  {/* Price Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Base Price</span>
                      <span className="font-semibold text-gray-900">
                        ₹{Math.round(parseInt(travelPackage.price.replace(/\D/g, ""))).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {selectedBike && selectedBike.priceMultiplier !== 1.0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{selectedBike.name}</span>
                        <span className="font-semibold text-gray-900">
                          +₹{Math.round(
                            parseInt(travelPackage.price.replace(/\D/g, "")) *
                              (selectedBike.priceMultiplier - 1)
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    {travelPackage.oldPrice && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-green-700 font-semibold">Discount</span>
                        <span className="font-semibold text-green-600">
                          -₹{(parseInt(travelPackage.oldPrice.replace(/\D/g, "")) - finalPrice).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200" />

                  {/* Total Price */}
                  <div>
                    <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mb-2">Total Amount</p>
                    <p className="text-4xl font-bold text-gray-900">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Action Button */}
                  {currentStep === 3 && (
                    <div className="pt-2 space-y-3">
                      <button className="w-full h-12 text-base font-bold bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
                        🔒 Confirm Booking
                      </button>
                      <p className="text-xs text-gray-600 text-center">
                        Secure checkout • Encrypted payments
                      </p>
                    </div>
                  )}

                  {currentStep < 3 && (
                    <div className="pt-2 text-center">
                      <p className="text-xs text-gray-600">
                        {currentStep === 1 ? '✓ 2 more steps to book' : '✓ 1 more step to book'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Banner */}
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-700 text-center font-medium">
                  🔒 Secure checkout • Encrypted payments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
