import React from "react";
import Image from "next/image";

const GoldAboutUs = () => {
  return (
    <div className="bg-background text-foreground dark:text-white">
      {/* About Section */}
      <div className="bg-muted dark:bg-gray-900">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">About GoldTrack</h1>
          <p className="text-muted-foreground dark:text-gray-300 max-w-2xl">
            Learn more about our mission to provide accurate and timely gold price information.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Our Mission</h2>
            <p className="text-lg mb-6 dark:text-gray-300">
              At GoldTrack, we&apos;re dedicated to providing investors, traders, and gold enthusiasts with the most accurate, up-to-date information on gold prices and market trends.
            </p>
            <p className="mb-6 dark:text-gray-300">
              Founded in 2025, our platform combines real-time data, comprehensive historical analysis, and expert market insights to help you make informed decisions about gold investments.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 dark:text-white">Our Data</h2>
            <p className="mb-6 dark:text-gray-300">
              We source our data from multiple trusted financial institutions and markets around the world. Our prices are updated in real-time, ensuring you always have access to the most current information.
            </p>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610375461369-d613b564c5c3?q=80&w=2070&auto=format&fit=crop"
                alt="Gold bars"
                width={600}
                height={400}
                layout="responsive"
                priority
              />
            </div>

            <div className="bg-muted dark:bg-gray-900 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-4 dark:text-white">Why Trust GoldTrack?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary dark:text-yellow-400 mr-2">✓</span>
                  Real-time data from trusted sources
                </li>
                <li className="flex items-start">
                  <span className="text-primary dark:text-yellow-400 mr-2">✓</span>
                  Comprehensive historical database
                </li>
                <li className="flex items-start">
                  <span className="text-primary dark:text-yellow-400 mr-2">✓</span>
                  Expert market analysis and insights
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 dark:text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="font-bold dark:text-white cursor-pointer">What factors influence gold prices?</summary>
              <p className="mt-2 dark:text-gray-300">
                Gold prices are influenced by multiple factors including monetary policy, inflation, geopolitical tensions, supply and demand, central bank reserves, and market sentiment.
              </p>
            </details>
            <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="font-bold dark:text-white cursor-pointer">Why do gold prices fluctuate?</summary>
              <p className="mt-2 dark:text-gray-300">
                Gold prices fluctuate due to changes in supply and demand, economic indicators, geopolitical events, and market sentiment.
              </p>
            </details>
            <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="font-bold dark:text-white cursor-pointer">What is the difference between spot price and futures price?</summary>
              <p className="mt-2 dark:text-gray-300">
                The spot price is the current market price for immediate delivery, while the futures price is an agreed price for future delivery.
              </p>
            </details>
            <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="font-bold dark:text-white cursor-pointer">How often are gold prices updated?</summary>
              <p className="mt-2 dark:text-gray-300">
                Our gold prices are updated in real-time during market hours.
              </p>
            </details>
            <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="font-bold dark:text-white cursor-pointer">How do I export historical data?</summary>
              <p className="mt-2 dark:text-gray-300">
                Navigate to the Historical Data page, set your filters, and click &quot;Export Data&quot; to download as a CSV file.
              </p>
            </details>
            <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="font-bold dark:text-white cursor-pointer">Can I set price alerts?</summary>
              <p className="mt-2 dark:text-gray-300">
                Yes, registered users can set price alerts via email or push notifications.
              </p>
            </details>
            <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="font-bold dark:text-white cursor-pointer">How accurate is your pricing data?</summary>
              <p className="mt-2 dark:text-gray-300">
                We source our data from major global exchanges and financial institutions for high accuracy.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldAboutUs;
