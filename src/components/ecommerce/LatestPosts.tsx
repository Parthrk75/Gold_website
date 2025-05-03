// components/LatestPosts.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/utils/posts';

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export default async function LatestPosts() {
  const posts = await getAllPosts();
  const latestThree: BlogPost[] = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Blog Posts</h2>

      <div className="space-y-6">
        {latestThree.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 hover:shadow-lg hover:border-yellow-500 transition-all cursor-pointer bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                  {post.title}
                </h3>
                <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {post.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-yellow-600 group-hover:underline">
                <span>Read more</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
