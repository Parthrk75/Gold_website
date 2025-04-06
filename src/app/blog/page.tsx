"use client"
import BlogPost from './blog1.mdx';

import { MDXProvider } from "@mdx-js/react";


export default function BlogPage() {
  return (
    <div>
      <MDXProvider>
      <BlogPost />
      </MDXProvider>
    </div>
  );
}

