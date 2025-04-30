import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content', 'blog');

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = await fs.promises.readdir(postsDir);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(postsDir, file);
          const content = await fs.promises.readFile(filePath, 'utf-8');
          const { data } = matter(content);
          return {
            slug: file.replace('.mdx', ''),
            title: data.title,
            date: data.date,
            description: data.description,
          };
        })
    );
    return posts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export default async function BlogListPage() {
  const posts = await getAllPosts();

  // Get the latest post
  const latestPost = posts[0];
  // Get the remaining posts
  const remainingPosts = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Section - Latest Blog Post */}
      <div className="mb-12">
        <Link key={latestPost.slug} href={`/blog/${latestPost.slug}`}>
          <div className="group border border-gray-200 dark:border-gray-700 p-10 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="text-xs uppercase font-semibold text-yellow-600 mb-2">Gold Insights</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-500">
              {latestPost.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 line-clamp-4">
              {latestPost.description}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-400 mt-6">
              <span>{latestPost.date}</span>
              <span>6 min read</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Blog Cards Section - Remaining Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {remainingPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group border border-gray-200 dark:border-gray-700 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:scale-[1.05] transition-all duration-300 cursor-pointer">
              <div className="text-xs uppercase font-semibold text-yellow-600 mb-2">Gold Insights</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-500">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 line-clamp-3">
                {post.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-400 mt-4">
                <span>{post.date}</span>
                <span>5 min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Blogs Button */}
      <div className="text-center mt-12">
        <Link
          href="/gold-blog"
          className="inline-block px-8 py-4 bg-yellow-500 text-white text-lg rounded-full shadow-md hover:bg-yellow-600 hover:shadow-xl transition-all duration-300"
        >
          View All Blogs →
        </Link>
      </div>
    </div>
  );
}
