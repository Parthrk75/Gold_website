"use client";

import { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Calendar, Clock, User, ChevronRight, ArrowLeft } from "lucide-react";

import BlogPost from "../../app/blog/blog1.mdx";
import BlogPost1 from "../../app/blog/blog2.mdx";
import BlogPost2 from "../../app/blog/blog3.mdx";
import BlogPost3 from "../../app/blog/blog4.mdx";
import BlogPost4 from "../../app/blog/blog5.mdx";
import BlogPost5 from "../../app/blog/blog6.mdx";
import BlogPost6 from "../../app/blog/blog7.mdx";

export default function BlogPage() {
  const [activePost, setActivePost] = useState<string | null>(null);

  const blogs = [
    { id: "blog1", title: "Why Gold Prices Fluctuate Daily", summary: "Discover the real reasons behind daily gold price changes.", author: "John Doe", date: "April 6, 2025", readTime: "6 min read", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800", category: "Gold Market", featured: false, component: <BlogPost /> },
    { id: "blog2", title: "Gold vs. Stock Market: Best Investment in 2025?", summary: "Should you invest in gold or stocks in 2025?", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800", category: "Investing", featured: true, component: <BlogPost1 /> },
    { id: "blog3", title: "How Global Events Impact Gold Prices", summary: "Learn how global news shapes the gold market.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800", category: "Investing", featured: false, component: <BlogPost2 /> },
    { id: "blog4", title: "Is Now a Good Time to Buy Gold?", summary: "Expert insights on timing your gold investment.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800", category: "Investing", featured: false, component: <BlogPost3 /> },
    { id: "blog5", title: "5 Mistakes to Avoid When Investing in Gold", summary: "Avoid common traps with expert advice.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800", category: "Investing", featured: false, component: <BlogPost4 /> },
    { id: "blog6", title: "22K vs 24K Gold: What's the Difference?", summary: "Choosing the right gold purity explained.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800", category: "Investing", featured: false, component: <BlogPost5 /> },
    { id: "blog7", title: "How the Daily Gold Rate is Calculated", summary: "Understand how gold rates are determined daily.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800", category: "Investing", featured: false, component: <BlogPost6 /> },
  ];

  const featuredPost = blogs.find((post) => post.featured);
  const regularPosts = blogs.filter((post) => !post.featured);

  return (
    <MDXProvider>
      <main className="min-h-screen   transition-colors duration-500">
        {activePost === null ? (
          <>
            {featuredPost && (
              <section >
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                      {featuredPost.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {featuredPost.summary}
                    </p>
                    <div className="flex gap-4 text-gray-500 dark:text-gray-300 text-sm">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <button
                      onClick={() => setActivePost(featuredPost.id)}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                    >
                      Read More <ChevronRight size={20} />
                    </button>
                  </div>
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </section>
            )}

            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {regularPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setActivePost(post.id)}
                    className="cursor-pointer group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-yellow-600">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {post.summary}
                      </p>
                      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="">
            <div className="max-w-4xl mx-auto px-6">
              <button
                onClick={() => setActivePost(null)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm  hover:underline"
              >
                <ArrowLeft size={18} /> Back to Blogs
              </button>
              <div className="prose lg:prose-xl dark:prose-invert">
                {blogs.find((blog) => blog.id === activePost)?.component}
              </div>
            </div>
          </section>
        )}
      </main>
    </MDXProvider>
  );
}
