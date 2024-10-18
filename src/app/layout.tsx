import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { UserProvider } from "@/components/providers/UserProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://landmark-api.com'),
  title: {
    default: "Landmark API | Discover the World's Landmarks",
    template: "%s | Landmark API"
  },
  description: "Access comprehensive data on famous landmarks worldwide with our powerful and easy-to-use API.",
  keywords: ["landmarks", "API", "travel", "tourism", "geography", "world wonders"],
  authors: [{ name: "Landmark API" }],
  creator: "Landmark API",
  publisher: "Landmark API",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://landmark-api.com",
    siteName: "Landmark API",
    title: "Landmark API | Discover the World's Landmarks",
    description: "Access comprehensive data on famous landmarks worldwide with our powerful and easy-to-use API.",
    images: [
      {
        url: "https://landmark-api.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Landmark API - Discover the World's Landmarks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landmark API | Discover the World's Landmarks",
    description: "Access comprehensive data on famous landmarks worldwide with our powerful and easy-to-use API.",
    creator: "@landmark-api",
    images: ["https://landmark-api.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://landmark-api.com",
    languages: {
      'en-US': 'https://landmark-api.com/en-US',
      // Add more language alternatives as needed
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    // Add other search engine verifications as needed
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <AuthProvider>
            <main>{children}</main>
            <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}