import type { Metadata } from "next"
import DashboardLayout from "./dashboard-layout"

export const metadata: Metadata = {
  title: "Dashboard | Landmark API",
  description: "Manage your Landmark API account, view endpoints, and access API keys.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Landmark API Dashboard",
    description: "Manage your Landmark API account and access developer tools.",
    type: "website",
    // Ensure this image doesn't reveal sensitive information
    images: [{ url: "/dashboard-og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landmark API Dashboard",
    description: "Manage your Landmark API account and access developer tools.",
    // Ensure this image doesn't reveal sensitive information
    images: ["/dashboard-twitter-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  // Prevent caching of dashboard pages
  // Additional security headers
  other: {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.landmark-api.com;",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}