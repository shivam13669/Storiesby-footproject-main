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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your seamless journey from booking to unforgettable travel experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector line - positioned to pass through the center of number circles */}
          <div className="hidden md:block absolute top-[66px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-green-200 via-green-500 to-green-200 opacity-60 pointer-events-none" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step card */}
              <div className="bg-gradient-to-b from-white to-green-50/40 rounded-3xl px-7 py-10 pt-16 border border-green-500/15 shadow-lg hover:shadow-2xl transition-all duration-350 hover:-translate-y-2.5 relative">
                {/* Number circle - sits on the connector line */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-green-600 to-green-400 text-white flex items-center justify-center font-bold text-base shadow-xl" style={{ top: "-30px" }}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-[76px] h-[76px] rounded-[20px] bg-gradient-to-b from-emerald-50 to-white mx-auto mb-7 flex items-center justify-center text-3xl shadow-sm" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                  {step.icon}
                </div>

                {/* Text */}
                <h3 className="text-[22px] font-semibold text-slate-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-slate-700 text-[15px] leading-relaxed text-center">
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
