import { useState } from "react";
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import PackageInfo from "@/components/PackageInfo";
import PricingCard from "@/components/PricingCard";
import TripHighlights from "@/components/TripHighlights";
import TabNavigation from "@/components/TabNavigation";
import ItinerarySection from "@/components/ItinerarySection";
import PackageInclusions from "@/components/PackageInclusions";
import PolicyAccordion from "@/components/PolicyAccordion";
import PromoBanners from "@/components/PromoBanners";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";

const DestinationDetail = () => {
  const [activeTab, setActiveTab] = useState("itinerary");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <ImageGallery />

        {/* Two Column Layout - Only until End of Trip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <PackageInfo />
            <TripHighlights />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "itinerary" && <ItinerarySection />}
          </div>

          {/* Right Sidebar - Pricing Card (sticky, ends at End of Trip) */}
          <div className="lg:col-span-1">
            <PricingCard showForm={true} />
          </div>
        </div>

        {/* Full Width Content - After End of Trip */}
        <div className="mt-8">
          <PackageInclusions />

          {/* Policy Sections */}
          <PolicyAccordion title="Know Before You Go" defaultOpen={true}>
            <ul className="space-y-2 list-disc pl-5">
              <li>All Indian nationals are required to carry a valid Government ID proof.</li>
              <li>All foreign nationals are requested to carry their passports with them during the tours.</li>
              <li>All hotels rooms will be standard by default unless the customer specifies to receive a different category of rooms before booking.</li>
              <li>All expenses of a personal nature will be borne by the tourists themselves.</li>
              <li>International flights are not included as a part of the package.</li>
            </ul>
          </PolicyAccordion>

          <PromoBanners />

          <TrustBadges />

          <PolicyAccordion title="More On Iceland Tourism" defaultOpen={true}>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors border-r border-border pr-4">Iceland Tour Packages</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors border-r border-border pr-4">Things to do in Iceland</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Places to visit in Iceland</a>
            </div>
          </PolicyAccordion>

          <PolicyAccordion title="Confirmation Policy">
            <p>The booking confirmation will be sent within 24 hours of receiving full payment.</p>
          </PolicyAccordion>

          <PolicyAccordion title="Refund Policy">
            <p>Refund will be processed within 7-10 business days after cancellation approval.</p>
          </PolicyAccordion>

          <PolicyAccordion title="Cancellation Policy" defaultOpen={true}>
            <ul className="space-y-2 list-disc pl-5">
              <li>If cancellation is made 30 days or more before the date of travel, 30.0% of total booking cost will be charged as cancellation fees.</li>
              <li>If cancellation is made within 30 days before the date of travel, total booking cost will be charged as cancellation fees.</li>
              <li>In the event of unforeseen weather conditions, union issues, government restrictions, or any other circumstances beyond human control, certain trips or activities may be cancelled. In such cases, alternate feasible options will be provided. However, a cash refund will not be available.</li>
            </ul>
          </PolicyAccordion>

          <PolicyAccordion title="Payment Policy" defaultOpen={true}>
            <ul className="space-y-2 list-disc pl-5">
              <li>100.0% of total tour cost will have to be paid 0 days before the date of booking</li>
            </ul>
          </PolicyAccordion>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
