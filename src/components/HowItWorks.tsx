const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: "🧭",
      title: "Choose Your Trip",
      description: "Browse destinations, select packages, and pick your perfect adventure.",
    },
    {
      number: 2,
      icon: "📝",
      title: "Book Instantly",
      description: "Reserve your spot in minutes with simple online booking.",
    },
    {
      number: 3,
      icon: "✈️",
      title: "Travel & Explore",
      description: "Enjoy guided trips, stays, and experiences curated for you.",
    },
    {
      number: 4,
      icon: "💚",
      title: "We Handle Everything",
      description: "From transport to support, relax while we take care of the rest.",
    },
  ];

  return (
    <section className="bg-white" style={{ margin: "100px auto", padding: "0 20px" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="text-center" style={{ marginBottom: "60px" }}>
          <h2 className="font-bold text-slate-900 mb-3" style={{ fontSize: "44px", letterSpacing: "-0.5px" }}>
            How It Works
          </h2>
          <p className="text-slate-600 mx-auto" style={{ maxWidth: "640px", fontSize: "17px" }}>
            Your seamless journey from booking to unforgettable travel experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 relative" style={{ gap: "32px" }}>
          {/* Connector line - positioned to pass through the center of number circles */}
          <div className="hidden md:block absolute top-[66px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-green-200 via-green-500 to-green-200 opacity-60 pointer-events-none" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step card */}
              <div
                className="bg-gradient-to-b from-white to-emerald-50 rounded-[26px] border transition-all duration-350 hover:-translate-y-2.5 relative"
                style={{
                  padding: "60px 26px 40px 26px",
                  borderColor: "rgba(34, 197, 94, 0.15)",
                  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 28px 60px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 18px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)";
                }}
              >
                {/* Number circle - sits on the connector line */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-green-600 to-green-400 text-white flex items-center justify-center font-bold text-base shadow-xl" style={{ top: "-30px" }}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-[76px] h-[76px] rounded-[20px] bg-gradient-to-b from-emerald-50 to-white mx-auto flex items-center justify-center text-3xl" style={{ margin: "0 auto 28px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                  {step.icon}
                </div>

                {/* Text */}
                <h3 className="text-[22px] font-semibold text-slate-900 text-center" style={{ margin: "0 0 14px" }}>
                  {step.title}
                </h3>
                <p className="text-slate-700 text-[15px] leading-relaxed text-center" style={{ margin: "0" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
