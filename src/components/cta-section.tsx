"use client"
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Loader2, CheckCircle, Database, Cloud, Globe, Cpu } from "lucide-react";
import Link from 'next/link';
import { toast } from "@/hooks/use-toast";

const TechBadge = ({ children }:any) => (
  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
    {children}
  </Badge>
);

export default function EnhancedCTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://api.landmark-api.com/auth/register-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to create account');
      
      setIsSuccess(true);
      toast({
        title: "Account created successfully!",
        description: "Please check your email for further instructions.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error creating account",
        description: "Please try again later or contact support.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="w-full py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <motion.div
            style={{ scale, y }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-6">
              <TechBadge>GoLang</TechBadge>
              <TechBadge>PostgreSQL</TechBadge>
              <TechBadge>Redis</TechBadge>
              <TechBadge>Next.js</TechBadge>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
              Enterprise-Grade Landmark Data Platform
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Access comprehensive landmark data through our high-performance API. 
              Built with GoLang and optimized with Redis caching for 99.99% uptime.
            </p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-4 mb-6"
              onSubmit={handleSubmit}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="bg-white text-blue-900 hover:bg-gray-200 transition-colors"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : isSuccess ? (
                  <CheckCircle className="mr-2 h-4 w-4" />
                ) : (
                  <>
                    Get API Key
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.form>
            
            <p className="text-sm text-gray-400">
              {isSuccess 
                ? "Account created! Please check your email for further instructions." 
                : "Start with our free plan - no credit card required."}
            </p>
          </motion.div>

          <motion.div
            className="relative"
            style={{ y: floatY }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <motion.div 
              className="absolute inset-0 bg-blue-500 rounded-lg filter blur-xl opacity-20"
              animate={{
                opacity: [0.2, 0.3, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-semibold">PostgreSQL Backend</p>
                      <p className="text-sm text-gray-400">Scalable data storage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Cloud className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-semibold">Redis Caching</p>
                      <p className="text-sm text-gray-400">10,000+ daily requests</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-semibold">Global Coverage</p>
                      <p className="text-sm text-gray-400">Real-time updates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="font-semibold">99.99% Uptime</p>
                      <p className="text-sm text-gray-400">Enterprise reliability</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/docs">
                <Button className="mt-8 w-full bg-blue-600 hover:bg-blue-700">
                  View Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}