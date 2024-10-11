import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { UserProvider } from "@/components/providers/UserProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Landmark API | Discover the World's Landmarks",
  description: "Access comprehensive data on famous landmarks worldwide with our powerful and easy-to-use API.",
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
          <UserProvider>
            {children}
          </UserProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}