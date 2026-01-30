import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const PromoBanners = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 20,
    minutes: 49,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes } = prev;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
        }
        return { days, hours, minutes };
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 my-8">
      {/* Group Offer Banner */}
      <div
        className="relative rounded-lg overflow-hidden h-[180px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        <div className="relative z-10 p-6 h-full flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-1">
            Bigger Group? Get special offers up to 50% Off!
          </h3>
          <p className="text-primary-foreground/90 text-sm mb-4">
            We create unforgettable adventures, customised for your group.
          </p>
          <Button variant="outline" className="w-fit btn-outline-primary bg-background text-primary border-background hover:bg-background/90">
            Get A Callback
          </Button>
        </div>
      </div>

      {/* Sale Banner */}
      <div className="bg-footer rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-primary-foreground mb-1">
            Up to INR 75,900 OFF
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary-foreground/90">on selected trips</span>
            <span className="bg-sale text-primary-foreground text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1">
              🇮🇳 REPUBLIC DAY SALE!
            </span>
          </div>
          <p className="text-primary-foreground/70 text-sm mb-4">
            Connect with our destination experts to get exciting discounts
          </p>
          <Button className="btn-primary">
            Know more about the Deal
          </Button>
        </div>

        <div className="text-center">
          <p className="text-primary-foreground/80 text-sm mb-3">Hurry - up Sale ends in!</p>
          <div className="flex items-center gap-2">
            <div className="text-center">
              <div className="flex gap-1">
                <div className="flip-card">{String(timeLeft.days).padStart(2, '0')[0]}</div>
                <div className="flip-card">{String(timeLeft.days).padStart(2, '0')[1]}</div>
              </div>
              <span className="text-xs text-primary-foreground/60 mt-1 block">DAYS</span>
            </div>
            <span className="text-2xl text-primary-foreground font-bold">:</span>
            <div className="text-center">
              <div className="flex gap-1">
                <div className="flip-card">{String(timeLeft.hours).padStart(2, '0')[0]}</div>
                <div className="flip-card">{String(timeLeft.hours).padStart(2, '0')[1]}</div>
              </div>
              <span className="text-xs text-primary-foreground/60 mt-1 block">HOURS</span>
            </div>
            <span className="text-2xl text-primary-foreground font-bold">:</span>
            <div className="text-center">
              <div className="flex gap-1">
                <div className="flip-card">{String(timeLeft.minutes).padStart(2, '0')[0]}</div>
                <div className="flip-card">{String(timeLeft.minutes).padStart(2, '0')[1]}</div>
              </div>
              <span className="text-xs text-primary-foreground/60 mt-1 block">MINUTES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanners;
