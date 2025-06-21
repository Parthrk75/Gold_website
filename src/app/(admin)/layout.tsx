"use client";

import SchemaMarkup from "@/components/SchemaMarkup";
import AppHeader from "@/layout/AppHeader";
import Head from "next/head";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Dynamic class for main content margin based on sidebar state
  

  return (
    <div className="min-h-screen">
       <Head>
        <title>Today Gold Prices</title>
        <meta
          name="description"
          content="Admin dashboard for managing gold prices, analytics, and e-commerce data."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Admin Dashboard | Today Gold Prices" />
        <meta property="og:description" content="Manage and track live gold prices efficiently." />
        <meta property="og:url" content="https://www.todaygoldprices.org/admin" />
        <meta property="og:type" content="website" />
        <SchemaMarkup /> {/* ✅ Schema Markup Added */}
      </Head>
     
      <div
        
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}



