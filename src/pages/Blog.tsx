import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Do Treks in the Himalayas",
    excerpt: "Discover the most breathtaking trekking routes that will take you to the heart of the Himalayan mountains.",
    content: "The Himalayas offer some of the world's most spectacular trekking opportunities. From the gentle slopes of Dayara Bugyal to the challenging paths of the Everest Base Camp trek, there's something for every adventure seeker...",
    author: "Sarah Adventure",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170&auto=format&fit=crop",
    category: "Trekking"
  },
  {
    id: 2,
    title: "Motorcycle Journeys: The Ultimate Road Trip Guide",
    excerpt: "Everything you need to know about planning your perfect motorbike expedition across India.",
    content: "Motorbike expeditions offer a unique way to explore the country. With proper planning, right gear, and reliable companions, you can embark on journeys that will stay with you forever...",
    author: "Mike Rider",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1170&auto=format&fit=crop",
    category: "Biking"
  },
  {
    id: 3,
    title: "Wildlife Safari: Tips for Spotting Rare Animals",
    excerpt: "Learn expert techniques to maximize your chances of encountering India's most elusive wildlife.",
    content: "Wildlife safaris require patience, knowledge, and a bit of luck. In this comprehensive guide, we share insights from our experienced naturalists about the best practices for spotting rare animals...",
    author: "Dr. Nature Explorer",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1170&auto=format&fit=crop",
    category: "Wildlife"
  },
  {
    id: 4,
    title: "Beach Escapes: Hidden Gems Along the Coast",
    excerpt: "Explore lesser-known beaches that offer tranquility away from the tourist crowds.",
    content: "While popular beaches are beautiful, the real magic lies in discovering hidden gems. These secluded beaches offer pristine waters, untouched landscapes, and authentic local experiences...",
    author: "Lisa Beach Lover",
    date: "Dec 28, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1170&auto=format&fit=crop",
    category: "Beaches"
  },
  {
    id: 5,
    title: "Cultural Tours: Immerse Yourself in Local Heritage",
    excerpt: "Discover the rich cultural heritage through meaningful local interactions and heritage visits.",
    content: "The true essence of travel lies in connecting with local cultures. Through our cultural tours, experience authentic traditions, crafts, and cuisines that define these regions...",
    author: "Priya Culture Guide",
    date: "Dec 20, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1495442871050-4d73ef49dc1e?q=80&w=1170&auto=format&fit=crop",
    category: "Culture"
  },
  {
    id: 6,
    title: "Photography Tours: Capture Stunning Landscapes",
    excerpt: "A guide to capturing the most photogenic moments during your adventure travels.",
    content: "Photography can elevate your travel experience. Learn techniques to capture stunning landscapes, candid moments, and wildlife shots that tell the story of your journey...",
    author: "Alex Photographer",
    date: "Dec 15, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=1170&auto=format&fit=crop",
    category: "Photography"
  }
];

const Blog = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <Navigation />

        {/* Hero Section */}
        <div className="relative overflow-hidden py-16 px-6">
          <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-sky-200 to-teal-300 rounded-full opacity-30 filter blur-3xl transform rotate-45 -z-10 pointer-events-none"></div>
          <div className="absolute -bottom-28 -right-28 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-emerald-200 to-sky-200 rounded-full opacity-25 filter blur-3xl transform rotate-12 -z-10 pointer-events-none"></div>

          <main className="pt-8 pb-16 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-900 mb-4">
                Adventure Stories & Insights
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Read inspiring travel stories, expert tips, and insights from our community of adventurers.
              </p>
              <div className="mx-auto mt-3 h-1 w-32 rounded-full bg-emerald-900"></div>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer">
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4 border-t pt-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <span>{post.date}</span>
                    </div>

                    {/* Read More Button */}
                    <button className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
