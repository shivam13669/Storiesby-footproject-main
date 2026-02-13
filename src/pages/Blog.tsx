import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "@/styles/blog-v2.css";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load ionicons for the blog page icons
    const scriptModule = document.createElement("script");
    scriptModule.type = "module";
    scriptModule.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
    document.body.appendChild(scriptModule);

    const scriptNoModule = document.createElement("script");
    scriptNoModule.setAttribute("nomodule", "");
    scriptNoModule.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
    document.body.appendChild(scriptNoModule);

    return () => {
      document.body.removeChild(scriptModule);
      document.body.removeChild(scriptNoModule);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-grow pt-16 blog-v2-container">
        <article>
          {/* HERO */}
          <section className="section hero" aria-label="home">
            <div className="container">
              <h1 className="h1 hero-title">
                <strong className="strong">Hey, we’re StoriesByFoot.</strong> See our stories and ideas.
              </h1>

              <div className="wrapper">
                <form action="" className="newsletter-form">
                  <input type="email" name="email_address" placeholder="Your email address" className="email-field" />
                  <button type="submit" className="btn">Subscribe</button>
                </form>
                <p className="newsletter-text">
                  Get the email newsletter and unlock access to members-only content and updates
                </p>
              </div>
            </div>
          </section>

          {/* FEATURED POST */}
          <section className="section featured" aria-label="featured post">
            <div className="container">
              <p className="section-subtitle">
                Get started with our <strong className="strong">best stories</strong>
              </p>

              <ul className="has-scrollbar">
                {[
                  {
                    img: "/assets/blog-images/featured-1.jpg",
                    authors: ["/assets/blog-images/author-1.jpg", "/assets/blog-images/author-2.jpg"],
                    tags: ["Design", "Idea", "Review"],
                    title: "New technology is not good or evil in and of itself",
                    text: "Vestibulum vehicula dui venenatis neque tempor, accumsan iaculis sapien ornare. Sed at ante porta, ullamcorper massa eu, ullamcorper sapien. Donec pretium tortor augue. Integer egestas ut tellus sed pretium. Nullam tristique augue ut mattis vulputate. Duis et lorem in odio ultricies porttitor."
                  },
                  {
                    img: "/assets/blog-images/featured-2.jpg",
                    authors: ["/assets/blog-images/author-3.jpg"],
                    tags: ["Creative", "Product"],
                    title: "It’s a new era in design, there are no rules",
                    text: "Quibus autem in rebus tanta obscuratio non fit, fieri tamen potest, ut id ipsum, quod interest, non sit magnum. Ita fit ut, quanta differentia est in principiis naturalibus, tanta sit in finibus bonorum malorumque dissimilitudo."
                  },
                  {
                    img: "/assets/blog-images/featured-3.jpg",
                    authors: ["/assets/blog-images/author-4.jpg"],
                    tags: ["Design", "Creative", "Idea"],
                    title: "Perfection has to do with the end product",
                    text: "Aenean eget urna aliquet, viverra orci quis, aliquam erat. Ut rutrum quam quam, eu eleifend est blandit et. Vivamus suscipit ultrices venenatis. Aliquam massa ipsum, porta quis hendrerit at, varius sed leo. Curabitur convallis urna sit amet mi tempus posuere."
                  },
                  {
                    img: "/assets/blog-images/featured-4.jpg",
                    authors: ["/assets/blog-images/author-5.jpg", "/assets/blog-images/author-2.jpg"],
                    tags: ["People", "Story"],
                    title: "Everyone has a different life story",
                    text: "Non est igitur summum malum dolor. Tu autem inter haec tantam multitudinem hominum interiectam non vides nec laetantium nec dolentium. Nunc vero a primo quidem mirabiliter occulta natura est nec perspici nec cognosci potest."
                  },
                  {
                    img: "/assets/blog-images/featured-5.jpg",
                    authors: ["/assets/blog-images/author-6.jpg"],
                    tags: ["Design", "Lifestyle", "Idea"],
                    title: "The difference is quality",
                    text: "Vide, ne etiam menses! nisi forte eum dicis, qui, simul atque arripuit, interficit. Atque his de rebus et splendida est eorum et illustris oratio."
                  },
                  {
                    img: "/assets/blog-images/featured-6.jpg",
                    authors: ["/assets/blog-images/author-3.jpg"],
                    tags: ["Idea", "Creating"],
                    title: "Problems are not stop signs, they are guidelines",
                    text: "Quid ad utilitatem tantae pecuniae. Duo enim genera quae erant, fecit tria. Et quod est munus, quod opus sapientiae."
                  }
                ].map((post, index) => (
                  <li key={index} className="scrollbar-item">
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ "--width": 500, "--height": 600 } as any}>
                        <img src={post.img} width="500" height="600" loading="lazy" alt={post.title} className="img-cover" />
                        <ul className="avatar-list absolute">
                          {post.authors.map((author, aIdx) => (
                            <li key={aIdx} className="avatar-item">
                              <a href="#" className="avatar img-holder" style={{ "--width": 100, "--height": 100 } as any}>
                                <img src={author} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </figure>
                      <div className="card-content">
                        <ul className="card-meta-list">
                          {post.tags.map((tag, tIdx) => (
                            <li key={tIdx}><a href="#" className="card-tag">{tag}</a></li>
                          ))}
                        </ul>
                        <h3 className="h4">
                          <a href="#" className="card-title hover:underline">
                            <strong className="strong">{post.title}</strong>
                          </a>
                        </h3>
                        <p className="card-text">{post.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* RECENT POST */}
          <section className="section recent" aria-label="recent post">
            <div className="container">
              <div className="title-wrapper">
                <h2 className="h2 section-title">
                  See what we’ve <strong className="strong">written lately</strong>
                </h2>
                <div className="top-author">
                  <ul className="avatar-list">
                    {[1, 2, 3, 4, 5].map(i => (
                      <li key={i} className="avatar-item">
                        <a href="#" className="avatar large img-holder" style={{ "--width": 100, "--height": 100 } as any}>
                          <img src={`/assets/blog-images/author-${i}.jpg`} width="100" height="100" alt="top author" className="img-cover" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <span className="span">Meet our top authors</span>
                </div>
              </div>

              <ul className="grid-list">
                {[
                  {
                    img: "/assets/blog-images/recent-1.jpg",
                    authors: ["/assets/blog-images/author-3.jpg", "/assets/blog-images/author-5.jpg"],
                    tags: ["Lifestyle", "People", "Review"],
                    title: "Creating is a privilege but it’s also a gift",
                    text: "Nullam vel lectus vel velit pellentesque dignissim nec id magna. Cras molestie ornare quam at semper. Proin a ipsum ex. Curabitur eu venenatis justo. Nullam felis augue, imperdiet at sodales a, sollicitudin nec risus."
                  },
                  {
                    img: "/assets/blog-images/recent-2.jpg",
                    authors: ["/assets/blog-images/author-5.jpg"],
                    tags: ["Design", "Product", "Idea"],
                    title: "Being unique is better than being perfect",
                    text: "Nam in pretium dui. Phasellus dapibus, mi at molestie cursus, neque eros aliquet nisi, non efficitur nisi est nec mi. Nullam semper, ligula a luctus ornare, leo turpis fermentum lectus, quis volutpat urna orci a lectus. Duis et odio lobortis, auctor justo ut, egestas magna."
                  },
                  {
                    img: "/assets/blog-images/recent-3.jpg",
                    authors: ["/assets/blog-images/author-2.jpg", "/assets/blog-images/author-5.jpg", "/assets/blog-images/author-1.jpg"],
                    tags: ["Idea", "Product", "Review"],
                    title: "Now we’re getting somewhere",
                    text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec volutpat rhoncus quam, a feugiat elit gravida eget. Curabitur id pharetra ligula. Integer porttitor suscipit ante ac faucibus. Sed a enim non enim viverra pulvinar vel diam ut lorem congue feugiat."
                  },
                  {
                    img: "/assets/blog-images/recent-4.jpg",
                    authors: ["/assets/blog-images/author-3.jpg"],
                    tags: ["Lifestyle", "Design"],
                    title: "The trick to getting more done is to have the freedom to roam around",
                    text: "Integer nec mi cursus, blandit est et, auctor mauris. Aenean ex metus, faucibus in mattis at, tincidunt eu dolor. Cras hendrerit massa nec augue placerat rutrum. Sed facilisis massa enim, ac tempus diam elementum sit amet."
                  },
                  {
                    img: "/assets/blog-images/recent-5.jpg",
                    authors: ["/assets/blog-images/author-1.jpg", "/assets/blog-images/author-6.jpg"],
                    tags: ["People", "Story", "Lifestyle"],
                    title: "Every day, in every city and town across the country",
                    text: "Morbi a facilisis lectus. Ut eu dapibus risus, a interdum justo. Vestibulum volutpat velit ac tellus mollis, sit amet sodales metus elementum. Aliquam eu mi massa. Proin suscipit enim a pulvinar viverra."
                  },
                  {
                    img: "/assets/blog-images/recent-6.jpg",
                    authors: ["/assets/blog-images/author-6.jpg"],
                    tags: ["People", "Review", "Story"],
                    title: "Your voice, your mind, your story, your vision",
                    text: "Nullam auctor nisi non tortor porta, id dapibus lectus rhoncus. Vivamus lobortis posuere enim finibus sodales. Phasellus quis tellus scelerisque, sagittis tortor et, maximus metus."
                  }
                ].map((post, index) => (
                  <li key={index}>
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ "--width": 550, "--height": 660 } as any}>
                        <img src={post.img} width="550" height="660" loading="lazy" alt={post.title} className="img-cover" />
                        <ul className="avatar-list absolute">
                          {post.authors.map((author, aIdx) => (
                            <li key={aIdx} className="avatar-item">
                              <a href="#" className="avatar img-holder" style={{ "--width": 100, "--height": 100 } as any}>
                                <img src={author} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </figure>
                      <div className="card-content">
                        <ul className="card-meta-list">
                          {post.tags.map((tag, tIdx) => (
                            <li key={tIdx}><a href="#" className="card-tag">{tag}</a></li>
                          ))}
                        </ul>
                        <h3 className="h4">
                          <a href="#" className="card-title hover:underline">
                            <strong className="strong">{post.title}</strong>
                          </a>
                        </h3>
                        <p className="card-text">{post.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="btn" style={{ marginInline: "auto", marginBlock: "50px 30px" }}>Load more</button>
            </div>
          </section>

          {/* RECOMMENDED POST */}
          <section className="section recommended" aria-label="recommended post">
            <div className="container">
              <p className="section-subtitle">
                <strong className="strong">Recommended</strong>
              </p>
              <ul className="grid-list">
                {[
                  { img: "/assets/blog-images/recommended-1.jpg", authors: ["/assets/blog-images/author-5.jpg", "/assets/blog-images/author-2.jpg"], title: "The trick to getting more done is to have the freedom to roam around" },
                  { img: "/assets/blog-images/recommended-2.jpg", authors: ["/assets/blog-images/author-3.jpg"], title: "Every day, in every city and town across the country" },
                  { img: "/assets/blog-images/recommended-3.jpg", authors: ["/assets/blog-images/author-1.jpg"], title: "I work best when my space is filled with inspiration" },
                  { img: "/assets/blog-images/recommended-4.jpg", authors: ["/assets/blog-images/author-4.jpg", "/assets/blog-images/author-3.jpg"], title: "I have my own definition of minimalism" },
                  { img: "/assets/blog-images/recommended-5.jpg", authors: ["/assets/blog-images/author-6.jpg"], title: "Change your look and your attitude" },
                  { img: "/assets/blog-images/recommended-6.jpg", authors: ["/assets/blog-images/author-3.jpg"], title: "The difference is quality" }
                ].map((post, index) => (
                  <li key={index}>
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ "--width": 300, "--height": 360 } as any}>
                        <img src={post.img} width="300" height="360" loading="lazy" alt={post.title} className="img-cover" />
                        <ul className="avatar-list absolute">
                          {post.authors.map((author, aIdx) => (
                            <li key={aIdx} className="avatar-item">
                              <a href="#" className="avatar img-holder" style={{ "--width": 100, "--height": 100 } as any}>
                                <img src={author} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </figure>
                      <div className="card-content">
                        <h3 className="h5">
                          <a href="#" className="card-title hover:underline">
                            <strong className="strong">{post.title}</strong>
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="section newsletter">
            <h2 className="h2 section-title">
              Subscribe to <strong className="strong">new posts</strong>
            </h2>
            <form action="" className="newsletter-form">
              <input type="email" name="email_address" placeholder="Your email address" required className="email-field" />
              <button type="submit" className="btn">Subscribe</button>
            </form>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
