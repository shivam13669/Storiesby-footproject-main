import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import PackageInfo from "@/components/PackageInfo";
import PricingCard from "@/components/PricingCard";
import TripHighlights from "@/components/TripHighlights";
import TabNavigation from "@/components/TabNavigation";
import PackageInclusions from "@/components/PackageInclusions";
import PolicyAccordion from "@/components/PolicyAccordion";
import PromoBanners from "@/components/PromoBanners";
import TrustBadges from "@/components/TrustBadges";
import {
  Destination,
  DestinationPackage,
  findPackageAcrossDestinations,
  getDestinationBySlug,
  getPackageBySlug,
} from "@/data/destinations";

const DestinationDetail = () => {
  const { slug, packageSlug } = useParams<{ slug: string; packageSlug?: string }>();
  const [activeTab, setActiveTab] = useState("itinerary");

  let destination = slug ? getDestinationBySlug(slug) : undefined;
  let travelPackage =
    destination && packageSlug
      ? getPackageBySlug(destination.slug, packageSlug)
      : undefined;

  if ((!destination || !travelPackage) && packageSlug) {
    const fallback = findPackageAcrossDestinations(packageSlug);
    if (fallback) {
      destination = fallback.destination;
      travelPackage = fallback.travelPackage;
    }
  }

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  if (!travelPackage) {
    travelPackage = destination.packages[0];
  }

  const galleryImages = buildGalleryImages(destination, travelPackage);
  const inclusions = createInclusions(destination, travelPackage);
  const exclusions = createExclusions(destination);
  const knowBefore = createKnowBefore(destination);
  const cancellationPolicy = createCancellationPolicy();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Image Gallery */}
        <ImageGallery images={galleryImages} destinationName={destination.name} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <PackageInfo travelPackage={travelPackage} destination={destination} />
            <TripHighlights highlights={travelPackage.highlights} />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content - Itinerary (simplified) */}
            {activeTab === "itinerary" && (
              <div className="space-y-4 mb-8">
                <p className="text-muted-foreground">
                  {travelPackage.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Pricing Card (sticky) */}
          <div className="lg:col-span-1">
            <PricingCard travelPackage={travelPackage} showForm={false} />
          </div>
        </div>

        {/* Full Width Content */}
        <div className="mt-8">
          <PackageInclusions inclusions={inclusions} exclusions={exclusions} />

          {/* Policy Sections */}
          <PolicyAccordion title="Know Before You Go" defaultOpen={true}>
            <ul className="space-y-2 list-disc pl-5">
              {knowBefore.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PolicyAccordion>

          <PromoBanners />

          <TrustBadges />

          <PolicyAccordion title="Cancellation Policy" defaultOpen={true}>
            <ul className="space-y-2 list-disc pl-5">
              {cancellationPolicy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PolicyAccordion>

          <PolicyAccordion title="Refund Policy">
            <p>Refund will be processed within 7-10 business days after cancellation approval.</p>
          </PolicyAccordion>

          <PolicyAccordion title="Payment Policy" defaultOpen={true}>
            <ul className="space-y-2 list-disc pl-5">
              <li>100% of total tour cost will have to be paid before the date of booking</li>
            </ul>
          </PolicyAccordion>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const destinationGalleryMap: Record<string, string[]> = {
  ladakh: [
    "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f99?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1526481280695-3c4693df8ced?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  ],
  tawang: [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1558180079-7f0f7180a5ec?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1509098681029-b45e9c845022?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1600&q=80",
  ],
  bhutan: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1559112094-4137e19ff3a5?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1494475673543-6a6a27143b22?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1600&q=80",
  ],
  meghalaya: [
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1545652711-491a01fb5d28?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
  ],
  nepal: [
    "https://images.unsplash.com/photo-1509644851169-51ebdcca9864?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1563144760-3da8c746b16c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1460522324493-a0e90ff22a91?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1549989476-69a92fa57c4e?auto=format&fit=crop&w=1600&q=80",
  ],
  zanskar: [
    "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1493815793585-d94ccbc86df0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1516131206008-dd041a9764fd?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1542401886-65d27afda266?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1486870591958-9b9d7d1dda99?auto=format&fit=crop&w=1600&q=80",
  ],
};

const buildGalleryImages = (destination: Destination, travelPackage: DestinationPackage) => {
  const additionalImages = destinationGalleryMap[destination.slug] ?? [];
  const baseImages = [travelPackage.image, destination.heroImage, ...additionalImages].filter(
    (image): image is string => Boolean(image)
  );

  return Array.from(new Set(baseImages));
};

const createInclusions = (destination: Destination, travelPackage: DestinationPackage) => [
  `Accommodation on twin-sharing basis for ${travelPackage.duration.toLowerCase()}.`,
  "Daily breakfast and chef-curated dinners on travel days, with picnic lunches on highland drives.",
  `All surface transfers in private vehicles from ${destination.quickFacts.startPoint}.`,
  "Expedition leader, local cultural specialist, and dedicated support crew throughout.",
  `All permits, restricted area permissions, and monastery entry passes within ${destination.region}.`,
  "Emergency oxygen support, medical kit, and satellite communication backup where required.",
];

const createExclusions = (destination: Destination) => [
  `Flights or trains to and from ${destination.quickFacts.startPoint}.`,
  "Lunches on travel days unless specified, and personal beverages.",
  "Travel insurance, medical expenses, or evacuation beyond inclusions.",
  "Camera fees, tips, and personal purchases such as souvenirs.",
  "Optional adventure activities not mentioned in the inclusions.",
];

const createKnowBefore = (destination: Destination) => [
  `${destination.quickFacts.travelStyle} journeys demand good fitness; begin light cardio and breathing exercises at least three weeks prior.`,
  `${destination.name} weather can swing rapidly—layered clothing, gloves, and rain protection are essential.`,
  "Carry original government-issued photo ID for each traveller for permits and hotel check-ins.",
  "Network connectivity is limited outside major towns; inform family about low-connectivity days.",
  "Stay hydrated and follow acclimatisation guidelines shared by the expedition leader.",
];

const createCancellationPolicy = () => [
  "30 days before departure: 25% of the total trip cost is chargeable.",
  "15–30 days before departure: 50% of the total trip cost is chargeable.",
  "0–15 days before departure: 100% cancellation charges apply.",
  "Force majeure events may necessitate rerouting; refunds are guided by partner policies.",
];

export default DestinationDetail;
