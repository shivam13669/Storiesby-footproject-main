import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Users, Heart, Award, Zap } from "lucide-react";

const jobListings = [
  {
    id: 1,
    title: "Expedition Leader",
    location: "Ladakh, India",
    type: "Full-time",
    experience: "2-5 years",
    description: "Lead unforgettable bike and 4x4 expeditions across breathtaking landscapes. You'll manage group dynamics, ensure safety, and create memorable experiences for our travelers.",
    responsibilities: [
      "Lead guided expeditions across Ladakh, Zanskar, and other regions",
      "Ensure safety protocols and risk management",
      "Manage group dynamics and create engaging experiences",
      "Coordinate with local partners and logistics teams"
    ],
    requirements: [
      "2-5 years of experience in expedition leading or tour guiding",
      "Strong knowledge of bike riding and off-road driving",
      "Excellent communication and leadership skills",
      "First Aid certification required",
      "Passion for mountains and adventure travel"
    ]
  },
  {
    id: 2,
    title: "Content & Social Media Manager",
    location: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    description: "Create compelling stories and content that inspire wanderlust. Tell the StoriesByFoot narrative through photography, videography, and engaging social media content.",
    responsibilities: [
      "Create and manage social media content across platforms",
      "Produce travel stories and expedition chronicles",
      "Manage Instagram, Facebook, and YouTube channels",
      "Collaborate with expedition teams for content collection",
      "Design marketing materials and campaigns"
    ],
    requirements: [
      "1-3 years of experience in social media or content creation",
      "Strong storytelling and writing skills",
      "Photography/videography skills (nice to have)",
      "Passion for travel and adventure",
      "Proficiency with design tools (Canva, Adobe Creative Suite)"
    ]
  },
  {
    id: 3,
    title: "Operations & Logistics Coordinator",
    location: "Kochi, India",
    type: "Full-time",
    experience: "1-3 years",
    description: "Keep our expeditions running smoothly. Manage bookings, coordinate logistics, track inventory, and ensure every traveler has a seamless experience from booking to return.",
    responsibilities: [
      "Manage expedition bookings and customer communications",
      "Coordinate vehicle maintenance and logistics",
      "Track inventory and equipment management",
      "Handle permits, insurance, and documentation",
      "Support customer service and post-trip follow-ups"
    ],
    requirements: [
      "1-3 years of experience in operations or logistics",
      "Excellent organizational and multitasking skills",
      "Strong attention to detail",
      "Proficiency with booking systems and spreadsheets",
      "Problem-solving mindset and customer-focused approach"
    ]
  },
  {
    id: 4,
    title: "Marketing Executive",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Drive growth through creative marketing strategies. Develop campaigns, manage partnerships, and increase brand awareness across digital and traditional channels.",
    responsibilities: [
      "Develop and execute marketing campaigns",
      "Manage email marketing and customer engagement",
      "Create partnerships and collaborations",
      "Analyze marketing metrics and optimize strategies",
      "Manage marketing budget and ROI"
    ],
    requirements: [
      "2-4 years of experience in marketing or growth",
      "Strong knowledge of digital marketing channels",
      "Data-driven mindset with analytics experience",
      "Creative thinking and strategic planning skills",
      "Experience with marketing tools and platforms"
    ]
  },
  {
    id: 5,
    title: "Customer Experience Specialist",
    location: "Remote",
    type: "Full-time",
    experience: "1-2 years",
    description: "Be the voice of StoriesByFoot. Provide exceptional customer support, handle inquiries, resolve issues, and ensure every traveler feels valued and well-cared for.",
    responsibilities: [
      "Handle customer inquiries via email, phone, and chat",
      "Address complaints and resolve issues promptly",
      "Provide travel information and recommendations",
      "Process refunds and amendments",
      "Gather customer feedback and suggest improvements"
    ],
    requirements: [
      "1-2 years of experience in customer service or hospitality",
      "Excellent communication and problem-solving skills",
      "Patience, empathy, and customer-focused mindset",
      "Ability to work independently and in a team",
      "Basic knowledge of travel industry (nice to have)"
    ]
  },
  {
    id: 6,
    title: "Web Developer (React/Full-stack)",
    location: "Remote",
    type: "Full-time",
    experience: "2-5 years",
    description: "Build and maintain our digital presence. Develop responsive websites, booking systems, and tools that make adventure travel accessible and seamless for our customers.",
    responsibilities: [
      "Develop and maintain web applications using React",
      "Build APIs and backend services",
      "Implement responsive design and UI/UX",
      "Optimize website performance and SEO",
      "Collaborate with designers and product team"
    ],
    requirements: [
      "2-5 years of experience with React or modern web frameworks",
      "Strong JavaScript/TypeScript skills",
      "Experience with backend development (Node.js, Python, etc.)",
      "Database management experience",
      "Git and version control knowledge"
    ]
  }
];

const benefits = [
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Adventure Perks",
    description: "Discounted or free expeditions for employees and their families"
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Team Culture",
    description: "Collaborative, supportive team of passionate adventure lovers"
  },
  {
    icon: <Award className="w-8 h-8 text-yellow-500" />,
    title: "Growth Opportunities",
    description: "Professional development and skill enhancement programs"
  },
  {
    icon: <Zap className="w-8 h-8 text-green-500" />,
    title: "Flexible Work",
    description: "Remote-friendly roles with flexible working hours"
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navigation />
      <main className="pt-24 pb-16 px-6 md:px-12">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
              Join Our <span className="text-secondary">Adventure</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
              Build your career with StoriesByFoot. We're looking for passionate, creative people who love adventure and want to transform travel into unforgettable stories.
            </p>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Whether you're an expedition leader, marketer, developer, or operations wizard, there's a place for you in our team.
            </p>
          </div>
        </div>

        {/* Why Join Us */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Join StoriesByFoot?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="max-w-5xl mx-auto mb-16 bg-indigo-50 p-8 rounded-lg border border-indigo-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Authenticity</h3>
              <p className="text-slate-600">We believe in genuine connections and real stories, not manufactured experiences.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Safety First</h3>
              <p className="text-slate-600">Every decision is guided by the safety and well-being of our travelers and team.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Community Impact</h3>
              <p className="text-slate-600">We contribute positively to local communities and practice responsible tourism.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Continuous Growth</h3>
              <p className="text-slate-600">We invest in our people and celebrate learning and innovation.</p>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {jobListings.map((job) => (
              <div key={job.id} className="p-6 bg-white rounded-lg border shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-slate-600 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {job.experience}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{job.description}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-secondary font-bold">•</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Requirements</h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-secondary font-bold">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button className="bg-secondary hover:bg-secondary/90">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Application Section */}
        <section className="max-w-5xl mx-auto mt-16 bg-gradient-to-r from-secondary/10 to-emerald-100 p-8 rounded-lg border border-secondary/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Don't see a role that fits?</h2>
            <p className="text-slate-600 mb-6">
              We're always looking for talented people. Send us your resume and let's chat about how you can be part of the StoriesByFoot story.
            </p>
            <Button asChild className="mr-3">
              <a href="mailto:careers@storiesbyfoot.com">Send Your Resume</a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border">
              <h3 className="font-semibold text-slate-900 mb-2">What's the application process?</h3>
              <p className="text-slate-600 text-sm">Submit your resume and cover letter. We'll review and contact you within 1-2 weeks. Shortlisted candidates go through interviews and a final round discussion.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h3 className="font-semibold text-slate-900 mb-2">Is relocation required for remote roles?</h3>
              <p className="text-slate-600 text-sm">No! Remote roles can be done from anywhere. If you join an office-based role, we'll discuss relocation support on a case-by-case basis.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h3 className="font-semibold text-slate-900 mb-2">Do I need prior travel industry experience?</h3>
              <p className="text-slate-600 text-sm">Not necessarily! We value passion, learning ability, and alignment with our values. We'll provide training and support for your growth.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h3 className="font-semibold text-slate-900 mb-2">What's the salary and benefits structure?</h3>
              <p className="text-slate-600 text-sm">Salaries are competitive and based on experience and role. We offer flexible work, expedition discounts, health benefits, and professional development opportunities.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
