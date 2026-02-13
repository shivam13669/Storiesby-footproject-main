import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "The trick to getting more done is to have the freedom to roam around",
    excerpt: "Morbi a facilisis lectus. Ut eu dapibus risus, a interdum justo. Vestibulum volutpat velit ac tellus mollis.",
    authors: ["Sarah Adventure"],
    authorImages: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=550&auto=format&fit=crop",
    tags: ["Travel", "Ideas", "Productivity"]
  },
  {
    id: 2,
    title: "Every day, in every city and town across the country",
    excerpt: "Nullam auctor nisi non tortor porta, id dapibus lectus rhoncus. Vivamus lobortis posuere enim finibus sodales.",
    authors: ["Mike Rider"],
    authorImages: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=550&auto=format&fit=crop",
    tags: ["Inspiration", "Community", "Design"]
  },
  {
    id: 3,
    title: "Your voice, your mind, your story, your vision",
    excerpt: "Phasellus quis tellus scelerisque, sagittis tortor et, maximus metus. Sed tincidunt nulla at ligula laoreet.",
    authors: ["Dr. Nature Explorer"],
    authorImages: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=550&auto=format&fit=crop",
    tags: ["People", "Review", "Story"]
  },
  {
    id: 4,
    title: "12 Most Beautiful Places to Visit in the World",
    excerpt: "Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictumst. Nulla porttitor accumsan.",
    authors: ["Lisa Beach Lover", "John Explorer"],
    authorImages: [
      "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
    ],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=550&auto=format&fit=crop",
    tags: ["Travel", "Adventure", "Photography"]
  },
  {
    id: 5,
    title: "How to find your perfect travel destination",
    excerpt: "Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    authors: ["Priya Culture Guide"],
    authorImages: ["https://images.unsplash.com/photo-1517746915202-e1a89f0808f7?q=80&w=400&auto=format&fit=crop"],
    image: "https://images.unsplash.com/photo-1495442871050-4d73ef49dc1e?q=80&w=550&auto=format&fit=crop",
    tags: ["Guide", "Tips", "Planning"]
  },
  {
    id: 6,
    title: "Photography Tips for Perfect Travel Photos",
    excerpt: "Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis. Nulla porttitor accumsan tincidunt.",
    authors: ["Alex Photographer"],
    authorImages: ["https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&auto=format&fit=crop"],
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=550&auto=format&fit=crop",
    tags: ["Photography", "Tips", "Tutorial"]
  }
];

const recommendedPosts = [
  {
    id: 7,
    title: "The Secret to Getting Things Done",
    authors: ["Author One", "Author Two"],
    authorImages: [
      "https://images.unsplash.com/photo-1534528741775-253ff62d474d?q=80&w=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    ],
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Building Communities That Matter",
    authors: ["Jane Smith"],
    authorImages: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Design Thinking for Everyone",
    authors: ["Mark Johnson"],
    authorImages: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop"
  }
];

const Blog = () => {
  const [postsToShow, setPostsToShow] = useState(3);

  const displayedPosts = blogPosts.slice(0, postsToShow);

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Featured Section */}
        <section className="section featured" aria-label="featured post">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="flex flex-col justify-center">
                <h2 className="h2 text-4xl md:text-5xl font-light mb-6 leading-tight text-gray-900">
                  {blogPosts[0].title}
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
              </div>
              <div className="card-banner overflow-hidden rounded-2xl">
                <img
                  src={blogPosts[0].image}
                  width="550"
                  height="660"
                  loading="lazy"
                  alt={blogPosts[0].title}
                  className="w-full h-96 md:h-full object-cover img-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="section recent" aria-label="recent posts">
          <div className="container mx-auto px-4 md:px-6 py-16">
            <p className="section-subtitle text-lg mb-10 text-gray-600">
              <strong className="font-semibold text-gray-900">Recent Posts</strong>
            </p>

            <ul className="grid-list grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {displayedPosts.map((post) => (
                <li key={post.id}>
                  <div className="blog-card group cursor-pointer">
                    <figure className="card-banner overflow-hidden rounded-2xl mb-4 relative">
                      <img
                        src={post.image}
                        width="550"
                        height="660"
                        loading="lazy"
                        alt={post.title}
                        className="w-full h-64 object-cover img-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      <ul className="avatar-list absolute bottom-3 left-3 flex flex-row-reverse">
                        {post.authorImages.map((img, idx) => (
                          <li key={idx} className="avatar-item">
                            <a href="#" className="avatar w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 block group-hover:scale-90 transition-transform">
                              <img
                                src={img}
                                width="40"
                                height="40"
                                loading="lazy"
                                alt={post.authors[idx]}
                                className="w-full h-full object-cover"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </figure>

                    <div className="card-content">
                      <ul className="card-meta-list flex flex-wrap gap-3 mb-4">
                        {post.tags.map((tag, idx) => (
                          <li key={idx}>
                            <a href="#" className="card-tag text-xs font-semibold text-blue-600 hover:underline">
                              {tag}
                            </a>
                          </li>
                        ))}
                      </ul>

                      <h3 className="h4 text-xl font-light mb-3">
                        <a href="#" className="card-title text-gray-900 group-hover:underline">
                          {post.title}
                        </a>
                      </h3>

                      <p className="card-text text-sm text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {postsToShow < blogPosts.length && (
              <button
                onClick={() => setPostsToShow(prev => prev + 3)}
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Load more
              </button>
            )}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="section recommended py-16 border-t border-gray-200" aria-label="recommended posts">
          <div className="container mx-auto px-4 md:px-6">
            <p className="section-subtitle text-lg mb-10 text-gray-600">
              <strong className="font-semibold text-gray-900">Recommended</strong>
            </p>

            <ul className="grid-list grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recommendedPosts.map((post) => (
                <li key={post.id}>
                  <div className="blog-card group cursor-pointer">
                    <figure className="card-banner overflow-hidden rounded-2xl mb-4 relative">
                      <img
                        src={post.image}
                        width="300"
                        height="360"
                        loading="lazy"
                        alt={post.title}
                        className="w-full h-64 object-cover img-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      <ul className="avatar-list absolute bottom-3 left-3 flex flex-row-reverse">
                        {post.authorImages.map((img, idx) => (
                          <li key={idx} className={`avatar-item ${idx > 0 ? '-ml-3' : ''}`}>
                            <a href="#" className="avatar w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 block hover:scale-90 transition-transform">
                              <img
                                src={img}
                                width="40"
                                height="40"
                                loading="lazy"
                                alt={post.authors[idx]}
                                className="w-full h-full object-cover"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </figure>

                    <div className="card-content">
                      <h3 className="h5 text-lg font-light">
                        <a href="#" className="card-title text-gray-900 group-hover:underline">
                          {post.title}
                        </a>
                      </h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
