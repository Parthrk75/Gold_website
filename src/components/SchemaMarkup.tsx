"use client";

import Script from "next/script";

export default function SchemaMarkup() {
  return (
    <Script
      id="gold-price-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Today Gold Prices",
          "url": "https://www.todaygoldprices.org/",
          "description":
            "Get live gold prices, historical trends, and real-time gold rate updates.",
          "publisher": {
            "@type": "Organization",
            "name": "Today Gold Prices",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.todaygoldprices.org/logo.png",
            },
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.todaygoldprices.org/search?q={query}",
            "query-input": "required name=query",
          },
        }),
      }}
    />
  );
}
