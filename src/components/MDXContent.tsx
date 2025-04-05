'use client';

import { MDXProvider } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  // You can add custom mappings like `h1: (props) => <h1 className="text-4xl" {...props} />`
};

export function MDXWrapper({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
