import { useState } from "react";
import { Calendar, ChevronDown, Phone, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { AdvancedDatePicker } from "@/components/AdvancedDatePicker";
import { formatDate, startOfDay } from "date-fns";
import { BookingFormData, GuestData } from "@/pages/BookingPage";
import { DestinationPackage } from "@/data/destinations";
import AddGuestModal from "./AddGuestModal";

interface GuestDetailsStepProps {
  formData: BookingFormData;
  travelPackage: DestinationPackage;
  onFormDataChange: (data: Partial<BookingFormData>) => void;
}

const COUNTRIES = [
  { code: "IN", name: "India", dial: "+91" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "NP", name: "Nepal", dial: "+977" },
];

const COUNTRY_DIGIT_REQUIREMENTS: Record<string, { min: number; max: number }> = {
  IN: { min: 10, max: 10 },
  US: { min: 10, max: 10 },
  GB: { min: 10, max: 11 },
  CA: { min: 10, max: 10 },
  AU: { min: 9, max: 9 },
  DE: { min: 10, max: 11 },
  FR: { min: 9, max: 9 },
  IT: { min: 10, max: 10 },
  ES: { min: 9, max: 9 },
  JP: { min: 10, max: 11 },
  NP: { min: 10, max: 10 },
};

const GuestDetailsStep = ({
  formData,
  travelPackage,
  onFormDataChange,
}: GuestDetailsStepProps) => {
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.dial === formData.countryCode) || COUNTRIES[0]
  );
  const [countrySearch, setCountrySearch] = useState("");
  const [openCountryPopover, setOpenCountryPopover] = useState(false);
  const [openDatePopover, setOpenDatePopover] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    formData.travelDate ? new Date(formData.travelDate) : undefined
  );

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.dial.includes(countrySearch) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    onFormDataChange({ countryCode: country.dial });
    setOpenCountryPopover(false);
    setCountrySearch("");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onFormDataChange({ travelDate: formatDate(date, "yyyy-MM-dd") });
      setOpenDatePopover(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    const maxDigits = COUNTRY_DIGIT_REQUIREMENTS[selectedCountry.code]?.max || 15;
    const truncated = digitsOnly.slice(0, maxDigits);
    onFormDataChange({ phoneNumber: truncated });
  };

  const handleInputChange = (field: keyof Omit<BookingFormData, 'guests' | 'selectedBikeId' | 'countryCode'>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onFormDataChange({ [field]: e.target.value });
    };
  };

  const handleAddGuest = (guest: GuestData) => {
    onFormDataChange({
      guests: [...formData.guests, guest],
    });
  };

  const handleRemoveGuest = (index: number) => {
    onFormDataChange({
      guests: formData.guests.filter((_, i) => i !== index),
    });
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    const dateOnly = startOfDay(date);
    
    if (dateOnly < today) return true;
    
    // Check if date is in available dates
    if (travelPackage.availableDates) {
      const dateStr = formatDate(date, "yyyy-MM-dd");
      return !travelPackage.availableDates.includes(dateStr);
    }
    
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Card: Personal Information */}
      <div
        className="rounded-2xl border-2 p-8 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(229, 231, 235, 0.6)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
          <h2 className="text-3xl font-bold text-foreground">Your Details</h2>
        </div>
        
        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange("fullName")}
              className="h-12 text-base"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleInputChange("email")}
              className="h-12 text-base"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <Popover open={openCountryPopover} onOpenChange={(open) => {
                setOpenCountryPopover(open);
                if (!open) setCountrySearch("");
              }}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="px-4 py-3 border border-border rounded-lg bg-background hover:bg-muted transition-all flex items-center gap-2 min-w-fit h-12 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <span className="font-semibold text-foreground">{selectedCountry.dial}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="start">
                  <div className="flex flex-col max-h-96">
                    <div className="sticky top-0 z-10 p-3 border-b border-border bg-card">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/10 transition-colors flex items-center justify-between border-b border-border last:border-0 ${
                            selectedCountry.code === country.code
                              ? "bg-primary/20 font-semibold text-primary"
                              : "text-foreground"
                          }`}
                        >
                          <span>{country.name}</span>
                          <span className="font-medium text-muted-foreground">{country.dial}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Input
                type="tel"
                placeholder="9876543210"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                className="flex-1 h-12 text-base"
              />
            </div>
          </div>

          {/* Aadhaar Number */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Aadhaar Number <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="XXXX XXXX XXXX XXXX"
              value={formData.aadhaarNumber}
              onChange={handleInputChange("aadhaarNumber")}
              maxLength={16}
              className="h-12 text-base tracking-widest"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Required for domestic travel. Your information is secure and encrypted.
            </p>
          </div>
        </div>
      </div>

      {/* Card: Travel Date */}
      <div
        className="rounded-2xl border-2 p-8 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(229, 231, 235, 0.6)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
          <h2 className="text-3xl font-bold text-foreground">When will you travel?</h2>
        </div>
        
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Travel Date <span className="text-red-500">*</span>
          </label>
          <Popover open={openDatePopover} onOpenChange={setOpenDatePopover}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full h-12 px-4 border border-border rounded-lg bg-background hover:bg-muted transition-all flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span className={formData.travelDate ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {formData.travelDate
                    ? new Date(formData.travelDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Select a date"}
                </span>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card" align="start">
              <AdvancedDatePicker
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                availableDates={travelPackage.availableDates}
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground mt-2">
            Only available dates are shown. {travelPackage.availableDates?.length || 0} dates available.
          </p>
        </div>
      </div>

      {/* Card: Additional Guests */}
      <div
        className="rounded-2xl border-2 p-8 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(229, 231, 235, 0.6)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
            <h2 className="text-3xl font-bold text-foreground">Additional Guests</h2>
          </div>
          <Button
            onClick={() => setShowAddGuestModal(true)}
            className="btn-primary h-10"
          >
            + Add Guest
          </Button>
        </div>

        {formData.guests.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">No additional guests yet. Click "Add Guest" to add co-travelers.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.guests.map((guest, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{guest.name}</p>
                  <p className="text-sm text-muted-foreground">Aadhaar: {guest.aadhaarNumber}</p>
                </div>
                <button
                  onClick={() => handleRemoveGuest(index)}
                  className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Guest Modal */}
      <AddGuestModal
        isOpen={showAddGuestModal}
        onClose={() => setShowAddGuestModal(false)}
        onAddGuest={handleAddGuest}
      />
    </div>
  );
};

export default GuestDetailsStep;
