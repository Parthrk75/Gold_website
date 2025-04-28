'use client';

import { Clock, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import BlogPost from "../../app/blog/blog1.mdx";
import BlogPost1 from "../../app/blog/blog2.mdx";
import BlogPost2 from "../../app/blog/blog3.mdx";
import BlogPost3 from "../../app/blog/blog4.mdx";
import BlogPost4 from "../../app/blog/blog5.mdx";
import BlogPost5 from "../../app/blog/blog6.mdx";
import BlogPost6 from "../../app/blog/blog7.mdx";

export default function BlogList() {
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

  const regularPosts = blogs.filter((post) => !post.featured);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = regularPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="rounded-3xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 p-8 shadow-2xl dark:shadow-gray-900/50 backdrop-blur-md bg-white/50 dark:bg-gray-900/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text">
          Latest Blogs
        </h2>
        
        {/* Read More Blogs Link */}
        <Link
          href="/gold-blog"
          className="text-sm font-medium text-yellow-600 hover:underline dark:text-yellow-400"
        >
          Read More Blogs →
        </Link>
      </div>

      <section>
        <div className="mx-auto space-y-8">
          {currentPosts.map((post) => (
            <div
              key={post.id}
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
    </div>
  );
}
