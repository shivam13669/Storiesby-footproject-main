import ItineraryCarousel from "./ItineraryCarousel";
import ItineraryDay from "./ItineraryDay";
import reykjavikImg from "@/assets/reykjavik-itinerary.jpg";
import akureyriImg from "@/assets/akureyri-itinerary.jpg";
import icelandMain from "@/assets/iceland-main.jpg";
import icelandActivity from "@/assets/iceland-activity.jpg";
import icelandStays from "@/assets/iceland-stays.jpg";
import icelandWaterfall from "@/assets/iceland-waterfall.jpg";

const reykjavikDays = [
  {
    day: 1,
    title: "Arrival in Reykjavik | Day at Leisure",
    description: "Welcome to Iceland! Upon arrival at the airport, get transferred to your hotel. Post check-in, spend the rest of your day at leisure, where you can explore Iceland's capital on your own. You can dive into Reykjavik's Viking history at the Settlement Exhibition, which showcases the settlement of Iceland.",
    transfer: {
      type: "Private Transfer",
      vehicle: "Sedan",
      from: "Keflavik International Airport",
      to: "Hotel Reykjavik Grand In Reykjavik"
    },
    stay: {
      name: "Hotel Reykjavik Grand",
      stars: 4,
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      nights: 3,
      images: [icelandStays, icelandActivity, reykjavikImg]
    },
    experiences: [
      { image: icelandActivity, title: "The Settlement Exhibition" },
      { image: icelandMain, title: "Perlan Museum Of Icelandic Natural Wonders" }
    ]
  },
  {
    day: 2,
    title: "Day Trip to Iceland Golden Circle",
    description: "Today, board your transfer to explore Iceland's Golden Circle. Start with a visit to Thingvellir National Park, a UNESCO World Heritage site where you can walk between the North American and Eurasian tectonic plates. Next, marvel at the thundering Gullfoss Waterfall and experience the geothermal wonders of Geysir.",
    transfer: {
      type: "Shared Transfer",
      vehicle: "Coach",
      from: "Hotel Reykjavik Grand In Reykjavik",
      to: "Hotel Reykjavik Grand In Reykjavik",
      stops: 1
    }
  },
  {
    day: 3,
    title: "Whale Watching Tour",
    description: "Set sail on an unforgettable whale watching adventure from Reykjavik's Old Harbour. Witness majestic whales in their natural habitat as they swim alongside your boat. After the tour, spend the rest of your day exploring the charming streets of Reykjavik, visiting local cafes and boutiques."
  },
];

const akureyriDays = [
  {
    day: 4,
    title: "Transfer to Akureyri | Day at Leisure",
    description: "After breakfast, check out and board your flight to Akureyri, the 'Capital of North Iceland'. Upon arrival, transfer to your hotel. Spend the rest of the day exploring the charming town, known for its colorful houses and vibrant arts scene.",
    transfer: {
      type: "Flight Transfer",
      vehicle: "Aircraft",
      from: "Reykjavik Domestic Airport",
      to: "Akureyri Airport"
    },
    stay: {
      name: "Hotel Kea by Keahotels",
      stars: 4,
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      nights: 4,
      images: [akureyriImg, icelandStays, icelandActivity]
    }
  },
  {
    day: 5,
    title: "Day Trip to Diamond Circle",
    description: "Embark on the famous Diamond Circle route. Visit the powerful Dettifoss waterfall, Europe's most powerful waterfall, followed by the otherworldly Námaskarð geothermal area. Continue to Húsavík, the whale watching capital of Europe, and end at the stunning Goðafoss waterfall."
  },
  {
    day: 6,
    title: "Leisure Day in Akureyri",
    description: "Enjoy a relaxed day in Akureyri. Visit the Akureyri Botanical Garden, explore the local museums, or take a dip in the geothermal pools. The evening is perfect for experiencing local cuisine at one of the town's restaurants."
  },
  {
    day: 7,
    title: "Departure Day",
    description: "After a delicious breakfast, check out from your hotel. Transfer to Akureyri Airport for your flight back to Reykjavik, connecting to your international flight home. Take with you unforgettable memories of Iceland's natural wonders."
  },
];

const ItinerarySection = () => {
  return (
    <div>
      {/* Reykjavik Section */}
      <ItineraryCarousel
        images={[reykjavikImg, icelandMain, icelandActivity]}
        days={3}
        location="Reykjavik"
        totalImages={10}
      />
      {reykjavikDays.map((item) => (
        <ItineraryDay
          key={item.day}
          day={item.day}
          title={item.title}
          description={item.description}
          transfer={item.transfer}
          stay={item.stay}
          experiences={item.experiences}
        />
      ))}

      {/* Akureyri Section */}
      <div className="mt-8">
        <ItineraryCarousel
          images={[akureyriImg, icelandActivity, reykjavikImg]}
          days={4}
          location="Akureyri"
          totalImages={8}
        />
        {akureyriDays.map((item) => (
          <ItineraryDay
            key={item.day}
            day={item.day}
            title={item.title}
            description={item.description}
            transfer={item.transfer}
            stay={item.stay}
          />
        ))}
      </div>

      {/* End of Trip */}
      <div className="text-center py-12 border-t border-border mt-8">
        <h3 className="text-4xl md:text-5xl script-font text-gold">End Of Trip</h3>
      </div>
    </div>
  );
};

export default ItinerarySection;
