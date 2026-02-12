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
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.travelDate || !formData.aadhaarNumber) {
        alert("Please fill in all required fields");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.selectedBikeId) {
        alert("Please select a bike");
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
    <div className="min-h-screen" style={{ backgroundColor: "#f5f7fa" }}>
      <Navigation />

      <div className="w-full py-8 mt-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="mb-0 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Details
          </h1>
          <p className="text-gray-600">
            {travelPackage.name} • {travelPackage.duration}
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-12 bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Travel Info" },
              { num: 2, label: "Select Bike" },
              { num: 3, label: "Review Booking" },
            ].map((item, idx) => (
              <div key={item.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      item.num === currentStep
                        ? "bg-blue-600 text-white shadow-lg"
                        : item.num < currentStep
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.num < currentStep ? "✓" : item.num}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-nowrap">
                    {item.label}
                  </p>
                </div>
                {idx < 2 && (
                  <div
                    className={`flex-1 h-1 mx-3 transition-all ${
                      item.num < currentStep ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Checkout Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Form content */}
          <div className="lg:col-span-2">
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
            <div className="sticky top-20">
              {/* Booking Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
                {/* Package Header with Image */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 h-40 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-5xl mb-2">🏍️</div>
                    <p className="text-sm opacity-90">Bike Adventure Trip</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-6">
                  {/* Title Section */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Trip Summary
                    </h3>
                    <h2 className="text-lg font-bold text-gray-900">
                      {travelPackage.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
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
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        ₹{Math.round(parseInt(travelPackage.price.replace(/\D/g, ""))).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {selectedBike && selectedBike.priceMultiplier !== 1.0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Bike Upgrade</span>
                        <span className="font-medium text-gray-900">
                          +₹{Math.round(
                            parseInt(travelPackage.price.replace(/\D/g, "")) *
                              (selectedBike.priceMultiplier - 1)
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    {travelPackage.oldPrice && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-green-600 font-medium">Discount</span>
                        <span className="font-medium text-green-600">
                          -₹{(parseInt(travelPackage.oldPrice.replace(/\D/g, "")) - finalPrice).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200" />

                  {/* Total Price */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">TOTAL AMOUNT</p>
                      <p className="text-3xl font-bold text-gray-900">
                        ₹{finalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  {currentStep === 3 && (
                    <div className="pt-2">
                      <button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md">
                        Confirm Booking
                      </button>
                      <p className="text-xs text-gray-600 text-center mt-3">
                        Secure & encrypted payment
                      </p>
                    </div>
                  )}

                  {currentStep < 3 && (
                    <div className="pt-2">
                      <div className="text-xs text-gray-500 text-center">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                          {currentStep === 1 ? '2 more steps' : '1 more step'} to book
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Banner */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Secure Booking:</span> Your information is protected with SSL encryption
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
