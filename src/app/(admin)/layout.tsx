"use client";

import SchemaMarkup from "@/components/SchemaMarkup";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import Head from "next/head";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
       <Head>
        <title>Admin Dashboard | Today Gold Prices</title>
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
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}



