import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Do Treks in the Himalayas",
    excerpt: "Discover the most breathtaking trekking routes that will take you to the heart of the Himalayan mountains.",
    author: "Sarah Adventure",
    date: "Jan 15, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170&auto=format&fit=crop",
    category: "Trekking"
  },
  {
    id: 2,
    title: "Motorcycle Journeys: The Ultimate Road Trip Guide",
    excerpt: "Everything you need to know about planning your perfect motorbike expedition across India.",
    author: "Mike Rider",
    date: "Jan 10, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1170&auto=format&fit=crop",
    category: "Biking"
  },
  {
    id: 3,
    title: "Wildlife Safari: Tips for Spotting Rare Animals",
    excerpt: "Learn expert techniques to maximize your chances of encountering India's most elusive wildlife.",
    author: "Dr. Nature Explorer",
    date: "Jan 5, 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1170&auto=format&fit=crop",
    category: "Wildlife"
  },
  {
    id: 4,
    title: "Beach Escapes: Hidden Gems Along the Coast",
    excerpt: "Explore lesser-known beaches that offer tranquility away from the tourist crowds.",
    author: "Lisa Beach Lover",
    date: "Dec 28, 2025",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1170&auto=format&fit=crop",
    category: "Beaches"
  },
  {
    id: 5,
    title: "Cultural Tours: Immerse Yourself in Local Heritage",
    excerpt: "Discover the rich cultural heritage through meaningful local interactions and heritage visits.",
    author: "Priya Culture Guide",
    date: "Dec 20, 2025",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1495442871050-4d73ef49dc1e?q=80&w=1170&auto=format&fit=crop",
    category: "Culture"
  },
  {
    id: 6,
    title: "Photography Tours: Capture Stunning Landscapes",
    excerpt: "A guide to capturing the most photogenic moments during your adventure travels.",
    author: "Alex Photographer",
    date: "Dec 15, 2025",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=1170&auto=format&fit=crop",
    category: "Photography"
  }
];

const categories = ["All", "Trekking", "Biking", "Wildlife", "Beaches", "Culture", "Photography"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts[0];

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
            <div className="max-w-2xl">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Adventure Stories & Travel Insights
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover inspiring travel stories, expert tips, and insights from our community of adventurers. Learn how to make the most of your journeys.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-4">
                  Featured
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime} read</span>
                </div>
                <button className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 hover:text-emerald-600 transition-colors group">
                  Read Article
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">{post.readTime} read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.author}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
