import { CheckCircle2, MapPin, Calendar, Users, Bike, User } from "lucide-react";
import { BookingFormData, GuestData } from "@/pages/BookingPage";
import { DestinationPackage, BikeOption, Destination } from "@/data/destinations";

interface ConfirmationStepProps {
  formData: BookingFormData;
  travelPackage: DestinationPackage;
  destination: Destination;
  selectedBike: BikeOption | undefined;
  finalPrice: number;
}

const ConfirmationStep = ({
  formData,
  travelPackage,
  destination,
  selectedBike,
  finalPrice,
}: ConfirmationStepProps) => {
  const travelDateObj = new Date(formData.travelDate);
  const formattedDate = travelDateObj.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-900 mb-2">
          Almost There!
        </h2>
        <p className="text-green-800">
          Your booking details are ready. Review everything below and confirm to proceed.
        </p>
      </div>

      {/* Booking Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Package Details */}
        <div
          className="rounded-2xl border-2 p-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(229, 231, 235, 0.6)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Package</h3>
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Destination
              </p>
              <p className="text-lg font-semibold text-foreground">
                {destination.name}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Package Name
              </p>
              <p className="text-lg font-semibold text-foreground">
                {travelPackage.name}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Duration
              </p>
              <p className="text-lg font-semibold text-foreground">
                {travelPackage.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Travel Details */}
        <div
          className="rounded-2xl border-2 p-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(229, 231, 235, 0.6)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Travel Details</h3>
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Travel Date
              </p>
              <p className="text-lg font-semibold text-foreground">
                {formattedDate}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Number of Travelers
              </p>
              <p className="text-lg font-semibold text-foreground">
                {1 + formData.guests.length} {1 + formData.guests.length === 1 ? "person" : "people"}
              </p>
            </div>
          </div>
        </div>

        {/* Primary Traveler */}
        <div
          className="rounded-2xl border-2 p-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(229, 231, 235, 0.6)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Primary Traveler</h3>
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Name
              </p>
              <p className="text-lg font-semibold text-foreground">
                {formData.fullName}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Email
              </p>
              <p className="text-sm text-foreground break-all">
                {formData.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Phone
              </p>
              <p className="text-lg font-semibold text-foreground">
                {formData.countryCode} {formData.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Bike Selection */}
        {selectedBike && (
          <div
            className="rounded-2xl border-2 p-6 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(229, 231, 235, 0.6)",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Bike Selected</h3>
              <Bike className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Bike Model
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {selectedBike.name}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Engine
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {selectedBike.cc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Guests */}
        {formData.guests.length > 0 && (
          <div
            className="rounded-2xl border-2 p-6 overflow-hidden md:col-span-2"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(229, 231, 235, 0.6)",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">
                Additional Travelers ({formData.guests.length})
              </h3>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {formData.guests.map((guest: GuestData, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                >
                  <div>
                    <p className="font-semibold text-foreground">{guest.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Aadhaar: {guest.aadhaarNumber}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Guest {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div
        className="rounded-2xl border-2 p-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(229, 231, 235, 0.6)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h3 className="text-lg font-bold text-foreground mb-6">Price Details</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Base Price (per person)</span>
            <span className="font-semibold text-foreground">
              ₹{Math.round(parseInt(travelPackage.price.replace(/\D/g, ""))).toLocaleString("en-IN")}
            </span>
          </div>

          {selectedBike && selectedBike.priceMultiplier !== 1.0 && (
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">
                {selectedBike.name} Upgrade ({Math.round((selectedBike.priceMultiplier - 1) * 100)}%)
              </span>
              <span className="font-semibold text-foreground">
                +₹{Math.round(
                  parseInt(travelPackage.price.replace(/\D/g, "")) *
                    (selectedBike.priceMultiplier - 1)
                ).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {travelPackage.oldPrice && (
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-green-600 font-semibold">You Save</span>
              <span className="font-semibold text-green-600">
                -₹{(parseInt(travelPackage.oldPrice.replace(/\D/g, "")) - finalPrice).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-foreground">Total Price</span>
            <span className="text-3xl font-bold text-primary">
              ₹{finalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div
        className="rounded-2xl border-2 p-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%)",
          border: "2px solid rgba(59, 130, 246, 0.2)",
          boxShadow: "0 8px 32px rgba(59, 130, 246, 0.08)",
        }}
      >
        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
          Important Information
        </h4>
        <ul className="text-sm text-muted-foreground space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Your booking is tentative. We'll send a confirmation email within 24 hours.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Payment can be made via bank transfer, card, or UPI.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>Cancellation policy applies: 30+ days = 30% fee, Less than 30 days = 100% fee</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span>All travelers must carry valid government ID proof.</span>
          </li>
        </ul>
      </div>

      {/* Confirmation Note */}
      <div
        className="rounded-2xl border-2 p-6 overflow-hidden text-center"
        style={{
          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.02) 100%)",
          border: "2px solid rgba(34, 197, 94, 0.2)",
          boxShadow: "0 8px 32px rgba(34, 197, 94, 0.08)",
        }}
      >
        <p className="text-sm font-semibold" style={{ color: "rgb(6, 78, 59)" }}>
          By confirming this booking, you agree to our terms and conditions and have read our privacy policy.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationStep;
