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
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your seamless journey from booking to unforgettable travel experiences.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-emerald-300 via-green-500 to-emerald-300 opacity-60" />

          {/* Steps grid */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                {/* Number circle */}
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-400 text-white font-bold text-lg flex items-center justify-center shadow-lg z-10"
                >
                  {step.number}
                </div>

                {/* Card */}
                <div className="pt-16 pb-8 px-7 rounded-3xl bg-gradient-to-b from-white to-green-50 border border-green-200 border-opacity-15 shadow-lg hover:shadow-2xl transition-all duration-350 group-hover:-translate-y-2.5 bg-opacity-80 backdrop-blur-sm">
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-emerald-100 to-white mx-auto mb-7 flex items-center justify-center text-4xl shadow-sm">
                    {step.icon}
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-center text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .relative .absolute {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
