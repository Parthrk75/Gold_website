import React from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: What's Next in 2025",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development, from AI-powered tools to WebAssembly innovations.",
    author: "Sarah Johnson",
    date: "March 15, 2025",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
    category: "Technology",
    featured: true
  },
  {
    id: 2,
    title: "Building Scalable Applications with Modern Architecture",
    excerpt: "A deep dive into modern architectural patterns and best practices for building highly scalable web applications.",
    author: "Michael Chen",
    date: "March 12, 2025",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800",
    category: "Architecture"
  },
  {
    id: 3,
    title: "The Complete Guide to State Management in 2025",
    excerpt: "Understanding different state management approaches and choosing the right solution for your application needs.",
    author: "Emily Rodriguez",
    date: "March 10, 2025",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800",
    category: "Development"
  }
];

function App() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      {featuredPost && (
        <div className="relative overflow-hidden bg-gray-50 py-8 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  Featured Post
                </span>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {featuredPost.title}
                </h1>
                <p className="mt-6 text-xl text-gray-500">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <User size={20} />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={featuredPost.imageUrl}
                  alt="Featured post"
                  className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" src={post.imageUrl} alt={post.title} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-full text-sm font-medium shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="mt-4 text-gray-600 text-sm">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-emerald-600" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} className="text-emerald-500" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full inline-flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200">
                    Read More
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;


      
