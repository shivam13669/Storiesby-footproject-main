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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Header with back button */}
        <div className="mb-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="mb-6 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Package
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Complete Your Booking
                </h1>
              </div>
              <p className="text-muted-foreground text-lg ml-8">
                {travelPackage.name} • {travelPackage.duration}
              </p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between max-w-2xl mb-12 px-4 py-6 rounded-2xl" style={{ background: "rgba(59, 130, 246, 0.05)" }}>
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <button
                  onClick={() => step < currentStep && handleStepChange(step as BookingStep)}
                  className={`w-14 h-14 rounded-full font-bold text-sm transition-all flex items-center justify-center ${
                    step === currentStep
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl scale-110"
                      : step < currentStep
                      ? "bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? "✓" : step}
                </button>
                <p className="ml-3 text-sm font-semibold text-foreground">
                  {step === 1 ? "Guest Details" : step === 2 ? "Select Bike" : "Confirm"}
                </p>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1.5 mx-3 rounded-full transition-all ${
                      step < currentStep ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
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
            <div className="flex gap-4 mt-12">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="flex-1 h-12 text-base font-semibold"
                >
                  Previous Step
                </Button>
              )}
              {currentStep < 3 && (
                <Button
                  onClick={handleNextStep}
                  className="flex-1 btn-primary h-12 text-base font-semibold"
                >
                  Next Step
                </Button>
              )}
            </div>
          </div>

          {/* Right side - Booking Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-20 rounded-2xl border-2 p-6 space-y-6 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%)",
                border: "2px solid rgba(59, 130, 246, 0.2)",
                boxShadow: "0 20px 60px rgba(59, 130, 246, 0.15), 0 0 1px rgba(59, 130, 246, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Booking Summary
                </h3>
                <h2 className="text-xl font-bold text-foreground mb-1">
                  {travelPackage.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {travelPackage.duration}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <div className="space-y-3">
                  {formData.travelDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Travel Date:</span>
                      <span className="font-medium text-foreground">
                        {new Date(formData.travelDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  
                  {selectedBike && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Selected Bike:</span>
                      <span className="font-medium text-foreground">{selectedBike.name}</span>
                    </div>
                  )}

                  {formData.guests.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Additional Guests:</span>
                      <span className="font-medium text-foreground">{formData.guests.length}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                    <p className="text-3xl font-bold text-foreground">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {travelPackage.oldPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    Original: {travelPackage.oldPrice}
                  </p>
                )}
              </div>

              {currentStep === 3 && (
                <div className="border-t border-border pt-4">
                  <Button className="w-full btn-primary h-12 text-base font-semibold rounded-lg">
                    Confirm Booking
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    No payment required yet. We'll send you payment details shortly.
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
