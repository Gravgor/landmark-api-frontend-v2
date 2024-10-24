import React from 'react';
import { MapPin, Github, Twitter, Linkedin, Mail, Globe, ShieldCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FooterLink = ({ href, children }:any) => (
  <Link 
    href={href} 
    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
  >
    {children}
  </Link>
);

const FooterHeading = ({ children }:any) => (
  <h3 className="font-semibold text-white mb-4 text-lg">{children}</h3>
);

const SocialLink = ({ href, icon: Icon, label }:any) => (
  <Link 
    href={href}
    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group"
  >
    <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
    <span className="sr-only">{label}</span>
  </Link>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-16 bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-200">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>
              <span className="font-bold text-xl text-white">Landmark API</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Enterprise-grade landmark data platform powered by GoLang, PostgreSQL, and Redis. 
              Serving 10,000+ daily requests with 99.99% uptime.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://github.com/landmarkapi" icon={Github} label="GitHub" />
              <SocialLink href="https://twitter.com/landmarkapi" icon={Twitter} label="Twitter" />
              <SocialLink href="https://www.linkedin.com/company/landmarkapi" icon={Linkedin} label="LinkedIn" />
            </div>
          </div>

          {/* Products Column */}
          <div className="md:col-span-2">
            <FooterHeading>Product</FooterHeading>
            <ul className="space-y-3">
              <li><FooterLink href="#features">Features</FooterLink></li>
              <li><FooterLink href="/pricing">Pricing</FooterLink></li>
              <li><FooterLink href="/documentation">Documentation</FooterLink></li>
              <li><FooterLink href="/changelog">Changelog</FooterLink></li>
              <li><FooterLink href="/integrations">Integrations</FooterLink></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-2">
            <FooterHeading>Resources</FooterHeading>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/documentation">
                  <BookOpen className="h-4 w-4" />
                  API Docs
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/status">
                  <Globe className="h-4 w-4" />
                  Status
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/security">
                  <ShieldCheck className="h-4 w-4" />
                  Security
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-3">
              <li><FooterLink href="/about-us">About Us</FooterLink></li>
              <li><FooterLink href="/careers">Careers</FooterLink></li>
              <li><FooterLink href="/blog">Blog</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-2">
            <FooterHeading>Legal</FooterHeading>
            <ul className="space-y-3">
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/cookies">Cookie Policy</FooterLink></li>
              <li><FooterLink href="/licenses">Licenses</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-b border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Stay up to date</h3>
              <p className="text-gray-400">Get the latest updates on our API features and technical content.</p>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Landmark API. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="mailto:support@landmarkapi.com" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail className="h-4 w-4" />
              support@landmarkapi.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}