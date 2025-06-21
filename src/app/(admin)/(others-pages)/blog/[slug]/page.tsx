import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import Link from 'next/link';

// Custom MDX component overrides with Tailwind styles
const components = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-yellow-700 mb-6" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-gray-700 dark:text-gray-300 mb-4" {...props} />
  ),
  div: (props: React.HTMLProps<HTMLDivElement>) => (
    <div className="text-gray-700 dark:text-gray-300 mb-4" {...props} />
  ),
  strong: (props: React.HTMLProps<HTMLElement>) => (
    <strong className="text-yellow-700" {...props} />
  ),
};

type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
};

const postsDir = path.join(process.cwd(), 'content', 'blog');

// Read a post from the filesystem using its slug
async function getPostBySlug(slug: string): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  try {
    const fullPath = path.join(postsDir, `${slug}.mdx`);
    const fileContent = await fs.promises.readFile(fullPath, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
      frontmatter: data as BlogFrontmatter,
      content,
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

// Props expected by the page component
// Adjust Props type to expect a Promise for params
type Props = {
  params: Promise<{ slug: string }>;
};

// Page component
export default async function BlogPostPage({ params }: Props) {
  // Ensure params is awaited properly
  const { slug } = await params;

  const result = await getPostBySlug(slug);
  if (!result) return notFound();

  const { frontmatter, content } = result;

  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-semibold text-yellow-600 hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
      {/* <h1 className="text-3xl font-bold text-yellow-700 mb-6">{frontmatter.title}</h1> */}
      <p className="text-gray-700 dark:text-gray-300 mb-4">{frontmatter.description}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{frontmatter.date}</p>

      <MDXRemote source={content} components={components} />
    </div>
  );
}



// For static site generation (SSG)
export async function generateStaticParams() {
  const files = await fs.promises.readdir(postsDir);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
    }));
}

// Optional interfaces for layout/metadata (if needed later)
export interface PageProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[]>;
}

export interface LayoutProps {
  children?: React.ReactNode;
  params: { slug: string };
}
