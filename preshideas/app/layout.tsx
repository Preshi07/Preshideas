import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./component/navbar";
import Footer from "./component/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Preshideas";
const siteUrl = "https://preshideas.com"; // make sure this is your live domain
const description =
  "Innovative Digital Solutions for Modern Businesses - Preshideas";

// Prefer a dedicated OG image (1200x630). Put it in /public/og/preshideas.png
const ogImage = `${siteUrl}/og/preshideas.png`;


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },

  description,

  applicationName: siteName,

  keywords: [
    "Preshideas",
    "web design",
    "web development",
    "digital agency",
    "SEO",
    "branding",
    "automation",
    "Next.js development",
    "UI/UX",
  ],

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logos/brand.png",
    apple: "/logos/brand.png",
  },

  openGraph: {
    title: siteName,
    description,
    url: siteUrl,
    siteName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${siteName} preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: [ogImage],
    // site: "@yourhandle", // optional
    // creator: "@yourhandle", // optional
  },

  // Optional: add verification codes when you have them
  // verification: {
  //   google: "GOOGLE_SEARCH_CONSOLE_CODE",
  //   bing: "BING_WEBMASTER_CODE",
  // },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Basic JSON-LD structured data (Organization + Website)
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logos/brand.png`,
    sameAs: [
      // add your real profiles
      // "https://www.linkedin.com/company/...",
      // "https://x.com/...",
      // "https://www.instagram.com/...",
    ],
  };
  

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Structured data */}
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        <div className="min-h-screen p-3">
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  );
}