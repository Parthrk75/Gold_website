"use client";

import { useState } from "react";
import BlogPost from "./blog1.mdx";
import BlogPost1 from "./blog2.mdx";
import BlogPost2 from "./blog3.mdx";
import BlogPost3 from "./blog4.mdx";
import BlogPost4 from "./blog5.mdx";
import BlogPost5 from "./blog6.mdx";
import BlogPost6 from "./blog7.mdx";
import { MDXProvider } from "@mdx-js/react";
import { Calendar, Clock, User, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const [activePost, setActivePost] = useState<string | null>(null);

  const blogs = [
    {
      id: "blog1",
      title: "Why Gold Prices Fluctuate Daily",
      summary:
        "Discover the real reasons behind daily gold price changes. Learn how inflation, demand, and global events influence the market.",
      author: "John Doe",
      date: "April 6, 2025",
      readTime: "6 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800",
      category: "Gold Market",
      featured: false,
      component: <BlogPost/>,
    },
    {
      id: "blog2",
      title: "Gold vs. Stock Market: Best Investment in 2025?",
      summary:
        "Should you invest in gold or stocks in 2025? Explore the pros and cons and what experts are saying.",
      author: "Jane Smith",
      date: "April 5, 2025",
      readTime: "7 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800",

      category: "Investing",
      featured: true,
      component: <BlogPost1 />,
    },
    {
      id: "blog3",
      title: "How Global Events Impact Gold Prices",
      summary:
        "Should you invest in gold or stocks in 2025? Explore the pros and cons and what experts are saying.",
      author: "Jane Smith",
      date: "April 5, 2025",
      readTime: "7 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800",

      category: "Investing",
      featured: false,
      component: <BlogPost2 />,
    },
    {
      id: "blog4",
      title: "Is Now a Good Time to Buy Gold? Expert Insights",
      summary:
        "Should you invest in gold or stocks in 2025? Explore the pros and cons and what experts are saying.",
      author: "Jane Smith",
      date: "April 5, 2025",
      readTime: "7 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800",

      category: "Investing",
      featured: false,
      component: <BlogPost3 />,
    },
    {
      id: "blog5",
      title: "5 Common Mistakes to Avoid When Investing in Gold",
      summary:
        "Should you invest in gold or stocks in 2025? Explore the pros and cons and what experts are saying.",
      author: "Jane Smith",
      date: "April 5, 2025",
      readTime: "7 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800",

      category: "Investing",
      featured: false,
      component: <BlogPost4 />,
    },
    {
      id: "blog6",
      title: "22K vs 24K Gold: What’s the Difference and Which Should You Buy?",
      summary:
        "Should you invest in gold or stocks in 2025? Explore the pros and cons and what experts are saying.",
      author: "Jane Smith",
      date: "April 5, 2025",
      readTime: "7 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800",

      category: "Investing",
      featured: false,
      component: <BlogPost5 />,
    },
    {
      id: "blog7",
      title: "How Is the Daily Gold Rate Calculated?",
      summary:
        "Should you invest in gold or stocks in 2025? Explore the pros and cons and what experts are saying.",
      author: "Jane Smith",
      date: "April 5, 2025",
      readTime: "7 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800",

      category: "Investing",
      featured: false,
      component: <BlogPost6 />,
    },
  ];

  const featuredPost = blogs.find((post) => post.featured);
  const regularPosts = blogs.filter((post) => !post.featured);

  return (
    <MDXProvider>
      
      <main className="min-h-screen bg-white">
        {activePost === null ? (
          <>
            {featuredPost && (
              <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Featured Post
                    </span>
                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      {featuredPost.title}
                    </h1>
                    <p className="mt-6 text-lg text-gray-600">{featuredPost.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-6 text-gray-500">
                      <div className="flex items-center gap-2">
                        <User size={18} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActivePost(featuredPost.id)}
                      className="mt-8 inline-flex items-center gap-2 text-yellow-600 font-medium hover:underline"
                    >
                      Read More <ChevronRight size={16} />
                    </button>
                  </div>
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-[350px] object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </section>
            )}

            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid md:grid-cols-2 gap-10">
                {regularPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setActivePost(post.id)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-yellow-600 rounded-full text-sm font-medium shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="mt-4 text-gray-600 text-sm">{post.summary}</p>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User size={16} className="text-yellow-600" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock size={14} className="text-yellow-500" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <span className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200">
                          Read More <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <button
              onClick={() => setActivePost(null)}
              className="mb-6 text-blue-600 underline font-medium"
            >
              ← Back to all blogs
            </button>
            <div>
              {blogs.find((blog) => blog.id === activePost)?.component}
            </div>
          </div>
        )}
      </main>
    </MDXProvider>
  );
}
