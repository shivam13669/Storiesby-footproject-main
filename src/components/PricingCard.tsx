import { useState } from "react";
import { Calendar, ChevronDown, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useCurrency, parsePrice } from "@/context/CurrencyContext";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { formatDate, isToday, isAfter, startOfDay } from "date-fns";

interface PricingCardProps {
  showForm?: boolean;
  title?: string;
  price?: string;
  oldPrice?: string;
  saving?: string;
  rating?: number;
  reviews?: number;
  itineraryUrl?: string;
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
  { code: "CN", name: "China", dial: "+86" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "SL", name: "Sri Lanka", dial: "+94" },
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
  CN: { min: 11, max: 11 },
  SG: { min: 8, max: 8 },
  MY: { min: 9, max: 10 },
  TH: { min: 9, max: 10 },
  PH: { min: 10, max: 10 },
  ID: { min: 9, max: 12 },
  SL: { min: 9, max: 9 },
  NP: { min: 10, max: 10 },
};

const PricingCard = ({ showForm = false, title = "Scenic Iceland With Diamond Circle", price = "INR 2,30,206", oldPrice = "INR 3,06,106", saving = "SAVE INR 75,900", itineraryUrl }: PricingCardProps) => {
  const { formatPrice } = useCurrency();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch] = useState("");
  const [openCountryPopover, setOpenCountryPopover] = useState(false);
  const [openDatePopover, setOpenDatePopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    travelDate: "",
    travelerCount: "",
    message: "",
  });

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.dial.includes(countrySearch) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setOpenCountryPopover(false);
    setCountrySearch("");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setFormData({
        ...formData,
        travelDate: formatDate(date, "dd/MM/yyyy"),
      });
      setOpenDatePopover(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    const maxDigits = COUNTRY_DIGIT_REQUIREMENTS[selectedCountry.code]?.max || 15;
    const truncated = digitsOnly.slice(0, maxDigits);
    setFormData({
      ...formData,
      phoneNumber: truncated,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { placeholder, value } = e.target;
    if (placeholder === "Full Name") {
      setFormData({ ...formData, fullName: value });
    } else if (placeholder === "Email") {
      setFormData({ ...formData, email: value });
    } else if (placeholder === "Traveler Count") {
      setFormData({ ...formData, travelerCount: value });
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, message: e.target.value });
  };

  // Disable past dates
  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    return date < today;
  };

  // Parse and format prices
  const formattedPrice = price ? formatPrice(parsePrice(price) ?? 0, { fromCurrency: "INR" }) : "";
  const formattedOldPrice = oldPrice ? formatPrice(parsePrice(oldPrice) ?? 0, { fromCurrency: "INR" }) : "";

  // Calculate savings if both prices exist
  let formattedSaving = saving;
  if (price && oldPrice) {
    const priceNum = parsePrice(price) ?? 0;
    const oldPriceNum = parsePrice(oldPrice) ?? 0;
    if (oldPriceNum > priceNum) {
      const savingAmount = oldPriceNum - priceNum;
      formattedSaving = `SAVE ${formatPrice(savingAmount, { fromCurrency: "INR" })}`;
    }
  }

  const handleDownloadItinerary = () => {
    if (itineraryUrl) {
      window.open(itineraryUrl, "_blank");
    }
  };
  return (
    <div className="flex flex-col gap-3 sticky top-20">
      {/* Card 1: Download Itinerary with Pricing */}
      <div className="card-shadow bg-card p-6 rounded-xl">
        {/* Package Title */}
        <div className="mb-4">
          <h3 className="text-base font-medium text-foreground">{title}</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-foreground">{formattedPrice}</span>
            {formattedOldPrice && (
              <span className="text-sm text-muted-foreground line-through">{formattedOldPrice}</span>
            )}
            {formattedSaving && (
              <span className="bg-sale text-primary-foreground text-xs px-2 py-0.5 rounded font-medium">
                {formattedSaving}
              </span>
            )}
          </div>
        </div>

        {/* Download Itinerary and Buy Now Buttons - Side by Side */}
        <div className="flex gap-3">
          <Button
            onClick={handleDownloadItinerary}
            disabled={!itineraryUrl}
            className="flex-1 btn-primary h-12 text-base font-semibold rounded-lg"
          >
            Download Itinerary
          </Button>
          <Button className="flex-1 btn-primary h-12 text-base font-semibold rounded-lg">
            Book Now
          </Button>
        </div>
      </div>

      {/* Card 2: Send Enquiry Form */}
      {showForm && (
        <div className="card-shadow bg-card p-6 rounded-xl">
          <div className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <Input
                placeholder="Full Name"
                className="bg-background border-border h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">*</span>
            </div>

            {/* Email */}
            <div className="relative">
              <Input
                placeholder="Email"
                type="email"
                className="bg-background border-border h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">*</span>
            </div>

            {/* Phone */}
            <div className="flex gap-2">
              <div className="flex items-center border border-border rounded-md px-3 bg-background h-12 min-w-[70px]">
                <span className="text-muted-foreground text-sm">+91</span>
                <svg className="w-4 h-4 ml-1 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="relative flex-1">
                <Input
                  placeholder="Your Phone"
                  className="bg-background border-border h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">*</span>
              </div>
            </div>

            {/* Travel Date & Traveller Count */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Input
                  placeholder="Travel Date"
                  className="bg-background border-border h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">*</span>
              </div>
              <div className="relative">
                <Input
                  placeholder="Traveler Count"
                  className="bg-background border-border h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">*</span>
              </div>
            </div>

            {/* Message */}
            <Textarea
              placeholder="Message..."
              className="bg-background border-border min-h-[100px] px-4 py-3 resize-none focus:border-primary focus:ring-1 focus:ring-primary"
            />

            {/* Send Enquiry Button */}
            <Button className="w-full btn-primary h-12 text-base font-semibold mt-5 rounded-lg">
              Send Enquiry
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCard;
