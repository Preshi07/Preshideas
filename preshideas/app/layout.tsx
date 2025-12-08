import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Preshideas",
  description:
    "Innovative Digital Solutions for Modern Businesses - Preshideas",
  icons: {
    icon: "/logos/brand.png",
  },
  metadataBase: new URL("https://preshideas.com"),
  openGraph: {
    title: "Preshideas",
    description:
      "Innovative Digital Solutions for Modern Businesses - Preshideas",
    url: "https://preshideas.com",
    siteName: "Preshideas",
    images: [
      {
        url: "/logos/brand.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preshideas",
    description:
      "Innovative Digital Solutions for Modern Businesses - Preshideas",
    images: ["/logos/brand.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
