import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Users, Heart, Award, Zap, Search, X, Star } from "lucide-react";
import { useState } from "react";

const jobListings = [
  {
    id: 1,
    title: "Expedition Leader",
    location: "Ladakh, India",
    type: "Full-time",
    experience: "2-5 years",
    description: "Lead unforgettable bike and 4x4 expeditions across breathtaking landscapes.",
    isFeatured: true,
    category: "Operations",
    salary: "₹25,000 - ₹40,000/month",
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
    description: "Create compelling stories that inspire wanderlust through engaging content.",
    isFeatured: true,
    category: "Marketing",
    salary: "₹20,000 - ₹35,000/month",
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
    description: "Keep our expeditions running smoothly with excellent coordination.",
    isFeatured: false,
    category: "Operations",
    salary: "₹18,000 - ₹30,000/month",
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
    description: "Drive growth through creative marketing strategies and campaigns.",
    isFeatured: false,
    category: "Marketing",
    salary: "₹22,000 - ₹38,000/month",
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
    description: "Be the voice of StoriesByFoot and provide exceptional support.",
    isFeatured: false,
    category: "Support",
    salary: "₹16,000 - ₹28,000/month",
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
    description: "Build and maintain our digital presence with modern web technologies.",
    isFeatured: true,
    category: "Technology",
    salary: "₹30,000 - ₹50,000/month",
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

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Expedition Leader",
    quote: "Working at StoriesByFoot has been a dream come true. I get to do what I love every day and work with an amazing team that truly cares about people.",
    image: "👨‍🔬"
  },
  {
    name: "Priya Verma",
    role: "Content Manager",
    quote: "The creativity and support here are unmatched. I've grown tremendously both professionally and personally. This is where adventure meets career.",
    image: "👩‍💼"
  },
  {
    name: "Arjun Patel",
    role: "Operations Coordinator",
    quote: "The team culture is incredible. Everyone is passionate about what they do, and it shows in the quality of experiences we create for our travelers.",
    image: "👨‍💻"
  }
];

const benefits = [
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Adventure Perks",
    description: "Discounted or free expeditions for employees"
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Team Culture",
    description: "Collaborative, supportive team of passionate explorers"
  },
  {
    icon: <Award className="w-8 h-8 text-yellow-500" />,
    title: "Growth",
    description: "Professional development and skill enhancement"
  },
  {
    icon: <Zap className="w-8 h-8 text-green-500" />,
    title: "Flexibility",
    description: "Remote-friendly with flexible working hours"
  }
];

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", resume: "", message: "" });

  const categories = ["All", "Operations", "Marketing", "Support", "Technology"];
  const locations = ["All", "Remote", "Ladakh, India", "Kochi, India"];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesLocation = selectedLocation === "All" || job.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const featuredJobs = jobListings.filter(job => job.isFeatured);

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    alert("Thank you for applying! We'll review your application and get back to you soon.");
    setFormData({ name: "", email: "", phone: "", resume: "", message: "" });
    setShowApplicationForm(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navigation />

      {/* Hero Section with Background */}
      <section 
        className="relative pt-24 pb-32 px-6 md:px-12 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(34, 197, 94, 0.95) 100%), url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 opacity-20"></div>
        <div className="relative max-w-5xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Join Our <span className="text-yellow-300">Team</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-white/90">
            Build your career with passionate explorers who transform travel into unforgettable stories
          </p>
          <p className="text-lg text-white/80">
            We're hiring talented people across operations, marketing, technology, and more
          </p>
        </div>
      </section>

      <main className="px-6 md:px-12">
        {/* Search & Filter Section */}
        <section className="max-w-5xl mx-auto -mt-16 relative z-10 mb-16">
          <div className="bg-white rounded-xl shadow-xl p-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by job title or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Job Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Location</label>
                <div className="flex flex-wrap gap-2">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedLocation === loc
                          ? "bg-green-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-slate-600">
              Showing <strong>{filteredJobs.length}</strong> of <strong>{jobListings.length}</strong> positions
            </div>
          </div>
        </section>

        {/* Featured Hot Jobs */}
        {filteredJobs.some(job => job.isFeatured) && (
          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              🔥 <span>Featured Opportunities</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredJobs.filter(job => job.isFeatured).map(job => (
                <div
                  key={job.id}
                  className="group bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-blue-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col h-full"
                  onClick={() => {
                    setSelectedJob(job);
                    setShowApplicationForm(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">{job.title}</h3>
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{job.description}</p>
                  <div className="space-y-2 mb-4 text-sm flex-1">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="text-green-600 font-semibold">{job.salary}</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg">
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Open Positions */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">All Open Positions</h2>
          {filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group p-6 bg-gradient-to-r from-slate-50 to-white rounded-lg border hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedJob(job);
                    setShowApplicationForm(true);
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 mb-2">{job.title}</h3>
                      <p className="text-slate-600 mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 text-slate-600">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="text-green-600 font-semibold">{job.salary}</div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{job.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Responsibilities</h4>
                      <ul className="space-y-1">
                        {job.responsibilities.slice(0, 2).map((resp, idx) => (
                          <li key={idx} className="flex gap-2 text-slate-600">
                            <span className="text-green-600">✓</span>
                            {resp}
                          </li>
                        ))}
                        {job.responsibilities.length > 2 && (
                          <li className="text-slate-500 italic">+{job.responsibilities.length - 2} more</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Key Requirements</h4>
                      <ul className="space-y-1">
                        {job.requirements.slice(0, 2).map((req, idx) => (
                          <li key={idx} className="flex gap-2 text-slate-600">
                            <span className="text-green-600">✓</span>
                            {req}
                          </li>
                        ))}
                        {job.requirements.length > 2 && (
                          <li className="text-slate-500 italic">+{job.requirements.length - 2} more</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg">
                    View & Apply
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-slate-600">No positions match your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </section>

        {/* Why Join Section */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Join StoriesByFoot?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-white rounded-lg border hover:shadow-lg transition-all text-center">
                <div className="flex justify-center mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-5xl mx-auto mb-16 bg-gradient-to-r from-blue-50 to-green-50 p-12 rounded-xl border border-blue-200">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto mb-16 bg-gradient-to-r from-blue-600 to-green-600 text-white p-12 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Start Your Adventure?</h2>
          <p className="text-lg mb-6 text-white/90">Explore opportunities above or send us your resume for future roles</p>
          <Button 
            asChild 
            className="bg-white text-blue-600 hover:bg-slate-100 font-semibold mr-3"
          >
            <a href="mailto:careers@storiesbyfoot.com">Send Resume</a>
          </Button>
          <Button 
            asChild 
            variant="outline"
            className="border-white text-white hover:bg-white/20"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </section>

        {/* FAQs */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What's the application process?",
                a: "Click 'Apply Now' on any position to fill out our quick application form. We review applications within 1-2 weeks and contact shortlisted candidates for interviews."
              },
              {
                q: "Do I need prior travel industry experience?",
                a: "Not necessarily! We value passion, learning ability, and alignment with our values. We provide training and support for growth."
              },
              {
                q: "Are remote roles truly flexible?",
                a: "Yes! Remote roles offer flexibility in working hours. We trust our team to deliver great work while maintaining work-life balance."
              },
              {
                q: "What's the interview process like?",
                a: "Typically 2-3 rounds: initial screening call, technical/skill assessment, and final conversation with our leadership team."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border hover:shadow-md transition-all">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Application Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                <p className="text-white/80">{selectedJob.location}</p>
              </div>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="p-8 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Resume URL or Link *</label>
                <input
                  type="url"
                  required
                  value={formData.resume}
                  onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="https://drive.google.com/your-resume or your-portfolio.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Letter / Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Tell us why you'd be a great fit for this role..."
                  rows="4"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg"
                >
                  Submit Application
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
