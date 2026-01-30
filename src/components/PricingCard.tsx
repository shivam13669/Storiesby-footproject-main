import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PricingCardProps {
  showForm?: boolean;
  title?: string;
  price?: string;
  oldPrice?: string;
  saving?: string;
  rating?: number;
  reviews?: number;
}

const PricingCard = ({ showForm = false, title = "Scenic Iceland With Diamond Circle", price = "INR 2,30,206", oldPrice = "INR 3,06,106", saving = "SAVE INR 75,900" }: PricingCardProps) => {
  return (
    <div className="card-shadow bg-card p-6 sticky top-20 rounded-xl">
      {/* Package Title */}
      <div className="mb-4">
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold text-foreground">{price}</span>
          {oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{oldPrice}</span>
          )}
          {saving && (
            <span className="bg-sale text-primary-foreground text-xs px-2 py-0.5 rounded font-medium">
              {saving}
            </span>
          )}
        </div>
      </div>

      {showForm ? (
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
        </div>
      ) : null}

      <Button className="w-full btn-primary h-12 text-base font-semibold mt-5 rounded-lg">
        Send Enquiry
      </Button>
    </div>
  );
};

export default PricingCard;
