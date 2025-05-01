/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.todaygoldprices.org',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    generateIndexSitemap: true,
  
    // Manually add blog pages
    additionalPaths: async (config) => {
      const slugs = ['blog1', 'blog2', 'blog3', 'blog4', 'blog5', 'blog6', 'blog7'];
      return slugs.map((slug) => ({
        loc: `/blog/${slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }));
    },
  };
  