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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <div className="flex gap-4 mt-12">
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

          {/* Right side - Booking Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-lg p-6 space-y-6 border border-gray-200 shadow-lg">
              <div>
                <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">
                  Booking Summary
                </h3>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {travelPackage.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {travelPackage.duration}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3 text-sm">
                  {formData.travelDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travel Date</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(formData.travelDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}

                  {selectedBike && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Bike</span>
                      <span className="font-semibold text-gray-900">{selectedBike.name}</span>
                    </div>
                  )}

                  {formData.guests.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Co-Travellers</span>
                      <span className="font-semibold text-gray-900">{formData.guests.length}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">Total Price</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{finalPrice.toLocaleString("en-IN")}
                  </p>
                </div>

                {travelPackage.oldPrice && (
                  <p className="text-xs text-gray-500 line-through">
                    Original: {travelPackage.oldPrice}
                  </p>
                )}
              </div>

              {currentStep === 3 && (
                <div className="border-t border-gray-200 pt-4">
                  <button className="w-full h-12 text-base font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all mb-3">
                    Confirm Booking
                  </button>
                  <p className="text-xs text-gray-600 text-center">
                    No payment needed now. We'll send payment details via email.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
