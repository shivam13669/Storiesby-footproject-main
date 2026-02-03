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
          {/* Connector line */}
          <div className="hidden md:block absolute top-[66px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-green-300 via-green-500 to-green-300 opacity-60 -z-10" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step card */}
              <div className="bg-gradient-to-b from-white to-green-50/40 rounded-3xl p-10 pt-16 border border-green-500/15 shadow-lg hover:shadow-2xl transition-all duration-350 hover:-translate-y-2.5 relative">
                {/* Number circle */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-green-400 text-white flex items-center justify-center font-bold text-lg shadow-xl">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-green-50 to-white mx-auto mb-7 flex items-center justify-center text-4xl shadow-inner border border-green-500/10">
                  {step.icon}
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-center">
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
