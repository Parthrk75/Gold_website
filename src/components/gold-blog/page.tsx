'use client';

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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const blogs = [
    { id: "blog1", title: "Why Gold Prices Fluctuate Daily", summary: "Discover the real reasons behind daily gold price changes.", author: "John Doe", date: "April 6, 2025", readTime: "6 min read", category: "Gold Market", featured: false, component: <BlogPost /> },
    { id: "blog2", title: "Gold vs. Stock Market: Best Investment in 2025?", summary: "Should you invest in gold or stocks in 2025?", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", category: "Investing", featured: true, component: <BlogPost1 /> },
    { id: "blog3", title: "How Global Events Impact Gold Prices", summary: "Learn how global news shapes the gold market.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", category: "Investing", featured: false, component: <BlogPost2 /> },
    { id: "blog4", title: "Is Now a Good Time to Buy Gold?", summary: "Expert insights on timing your gold investment.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", category: "Investing", featured: false, component: <BlogPost3 /> },
    { id: "blog5", title: "5 Mistakes to Avoid When Investing in Gold", summary: "Avoid common traps with expert advice.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", category: "Investing", featured: false, component: <BlogPost4 /> },
    { id: "blog6", title: "22K vs 24K Gold: What's the Difference?", summary: "Choosing the right gold purity explained.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", category: "Investing", featured: false, component: <BlogPost5 /> },
    { id: "blog7", title: "How the Daily Gold Rate is Calculated", summary: "Understand how gold rates are determined daily.", author: "Jane Smith", date: "April 5, 2025", readTime: "7 min read", category: "Investing", featured: false, component: <BlogPost6 /> },
  ];

  const featuredPost = blogs.find((post) => post.featured);
  const regularPosts = blogs.filter((post) => !post.featured);

  // Pagination Logic
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = regularPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <MDXProvider>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
        {activePost === null ? (
          <>
            {featuredPost && (
              <section className="py-16 bg-white dark:bg-gray-800 shadow-md rounded-xl mb-12">
                <div className="max-w-4xl mx-auto px-8 space-y-6">
                  <span className="inline-block px-6 py-2 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Featured
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {featuredPost.title}
                  </h1>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {featuredPost.summary}
                  </p>
                  <div className="flex gap-6 text-gray-500 dark:text-gray-300 text-sm">
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
                    className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none transition duration-300 ease-in-out"
                  >
                    Read More <ChevronRight size={20} />
                  </button>
                </div>
              </section>
            )}

            <section className="py-16">
              <div className="mx-auto space-y-8">
                {currentPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setActivePost(post.id)}
                    className="cursor-pointer group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <span className="text-xs font-semibold text-yellow-700 uppercase">
                      {post.category}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 mt-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                      {post.summary}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-400 mt-4">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none transition duration-300 ease-in-out"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none transition duration-300 ease-in-out"
                >
                  Next
                </button>
              </div>
            </section>
          </>
        ) : (
          <section className="py-16 bg-white dark:bg-gray-800 shadow-md rounded-xl mb-12">
            <div className="max-w-4xl mx-auto px-8">
              <button
                onClick={() => setActivePost(null)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm hover:underline mb-6"
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
