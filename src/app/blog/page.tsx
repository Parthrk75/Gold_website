"use client"
import BlogPost from './test.mdx';

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

