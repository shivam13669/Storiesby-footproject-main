import { CheckCircle2 } from "lucide-react";
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
    <div className="space-y-5">
      {/* Success Message */}
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">
          Review Your Booking
        </h2>
        <p className="text-green-800">
          Please verify all details before confirming your booking
        </p>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Destination & Duration */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all">
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
            Trip Details
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600 mb-1">Destination</p>
              <p className="text-lg font-bold text-gray-900">{destination.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Package</p>
              <p className="text-lg font-bold text-gray-900">{travelPackage.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Duration</p>
              <p className="text-lg font-bold text-gray-900">{travelPackage.duration}</p>
            </div>
          </div>
        </div>

        {/* Travel Date */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all">
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
            Travel Information
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600 mb-1">Travel Date</p>
              <p className="text-lg font-bold text-gray-900">{formattedDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Number of Travellers</p>
              <p className="text-lg font-bold text-gray-900">
                {1 + formData.guests.length} {1 + formData.guests.length === 1 ? "person" : "people"}
              </p>
            </div>
          </div>
        </div>

        {/* Primary Traveler */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all md:col-span-2">
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
            Primary Traveller
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Name</p>
              <p className="font-semibold text-gray-900">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Email</p>
              <p className="font-semibold text-gray-900 break-all text-sm">{formData.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Phone</p>
              <p className="font-semibold text-gray-900">
                {formData.countryCode} {formData.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Bike Selection */}
        {selectedBike && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
              Bike Selected
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-600 mb-1">Model</p>
                <p className="text-lg font-bold text-gray-900">{selectedBike.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Engine</p>
                <p className="text-lg font-bold text-gray-900">{selectedBike.cc}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Co-Travellers */}
      {formData.guests.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all">
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
            Co-Travellers ({formData.guests.length})
          </h3>
          <div className="space-y-2">
            {formData.guests.map((guest: GuestData, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">{guest.name}</p>
                  <p className="text-sm text-gray-600">Aadhaar: {guest.aadhaarNumber}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Guest {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all">
        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-5">
          Fare Summary
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-700">Base Price (per person)</span>
            <span className="font-semibold text-gray-900">
              ₹{Math.round(parseInt(travelPackage.price.replace(/\D/g, ""))).toLocaleString("en-IN")}
            </span>
          </div>

          {selectedBike && selectedBike.priceMultiplier !== 1.0 && (
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-700">
                {selectedBike.name} Upgrade ({Math.round((selectedBike.priceMultiplier - 1) * 100)}%)
              </span>
              <span className="font-semibold text-gray-900">
                +₹{Math.round(
                  parseInt(travelPackage.price.replace(/\D/g, "")) *
                    (selectedBike.priceMultiplier - 1)
                ).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {travelPackage.oldPrice && (
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-green-700 font-semibold">You Save</span>
              <span className="font-semibold text-green-700">
                -₹{(parseInt(travelPackage.oldPrice.replace(/\D/g, "")) - finalPrice).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-3">
            <span className="text-lg font-bold text-gray-900">Total Price</span>
            <span className="text-3xl font-bold text-blue-600">
              ₹{finalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Important Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
        <h4 className="font-bold text-yellow-900 mb-3">Important Information</h4>
        <ul className="text-sm text-yellow-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold mt-0.5">•</span>
            <span>Your booking is tentative until confirmed. We'll send confirmation within 24 hours.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold mt-0.5">•</span>
            <span>Payment details will be shared via email and SMS.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold mt-0.5">•</span>
            <span>Cancellation: 30+ days before = 30% fee, Less than 30 days = 100% fee</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold mt-0.5">•</span>
            <span>All travellers must carry valid government ID proof.</span>
          </li>
        </ul>
      </div>

      {/* Confirmation */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all">
        <p className="text-sm text-gray-700 font-medium leading-relaxed">
          By confirming this booking, you agree to our <a href="#" className="text-blue-600 hover:underline font-semibold">terms and conditions</a> and <a href="#" className="text-blue-600 hover:underline font-semibold">privacy policy</a>.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationStep;
