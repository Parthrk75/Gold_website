// src/utils/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content', 'blog');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = await fs.promises.readdir(postsDir);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx')) // Ensuring we're only dealing with markdown files
        .map(async (file) => {
          const filePath = path.join(postsDir, file);
          const content = await fs.promises.readFile(filePath, 'utf-8');
          const { data } = matter(content); // Parsing metadata using gray-matter
          return {
            slug: file.replace('.mdx', ''), // Removing the .mdx extension to use as the slug
            title: data.title,
            date: data.date,
            description: data.description,
          };
        })
    );
    return posts; // Returning the array of blog posts
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}
