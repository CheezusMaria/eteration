// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from "next-sitemap";

export async function getServerSideProps(ctx) {
  // Method to source urls from cms
  const results = await fetch(
    `${process.env.BACKEND_URL}/api/approvedProject/all`
  ).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return false;
    }
  });
  var fields = [];
  if (results && results.projectList) {
    results.projectList.map((startup, i) => {
      fields.push({
        loc: `https://startupfon.com/startups/${startup.ID}`, // Absolute url
        lastmod: new Date().toISOString(),
      });
    });
  }
  return getServerSideSitemap(ctx, fields);
}

// Default export to prevent next.js errors
export default function Sitemap() {}
