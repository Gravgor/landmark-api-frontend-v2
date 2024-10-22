"use client"

import * as React from "react"
import Link from "next/link"
import { MapPin, Menu, X, User, Search, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

const navItems = [
  { 
    name: "Products", 
    href: "#products",
    subItems: [
      { name: "Landmark API", href: "/pricing" },
    ]
  },
  { 
    name: "Resources", 
    href: "#resources",
    subItems: [
      { name: "Documentation", href: "/docs" },
      { name: "Contribute", href: "/submit-landmark" },
    ]
  },
]

export function Navbar() {
  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <MainNav />

          {/* This div wraps MobileNav and pushes it to the right in mobile view */}
          <div className="ml-auto md:hidden">
            <MobileNav />
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="#pricing">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/auth">
                <Button 
                  variant="outline"
                  className="border-white hover:bg-white text-blue-500 hover:text-blue-900"
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </motion.header>
  );
}


function MainNav() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <MapPin className="h-8 w-8 text-blue-400" />
        </motion.div>
        <motion.span 
          className="font-bold text-xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Landmark API
        </motion.span>
      </Link>
      <NavigationMenu className="hidden md:flex ml-8">
        <NavigationMenuList>
          {navItems.map((item, index) => (
            <NavigationMenuItem key={item.name}>
              {item.subItems ? (
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-blue-300">
                  {item.name}
                </NavigationMenuTrigger>
              ) : (
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className="bg-transparent text-white hover:bg-white/10 hover:text-blue-300 px-3 py-2 rounded-md transition-colors">
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              )}
              {item.subItems && (
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4 bg-white rounded-md shadow-lg">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={subItem.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-900"
                          >
                            <div className="text-sm font-medium leading-none">{subItem.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-white hover:bg-white/10 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-gradient-to-r from-blue-900 to-purple-900">
        <Link href="/" className="flex items-center">
          <MapPin className="mr-2 h-6 w-6 text-blue-400" />
          <span className="font-bold text-xl text-white">Landmark API</span>
        </Link>
        <nav className="mt-8 flex flex-col space-y-3">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-white">{item.name}</div>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block text-sm text-white/80 hover:text-blue-300 transition-colors pl-4"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block text-lg font-semibold text-white hover:text-blue-300 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/auth"
            className="block text-lg font-semibold text-white hover:text-blue-300 transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function CommandMenu() {
  return (
    <div className="relative w-full md:w-auto hidden md:block">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
      <Input 
        placeholder="Search documentation..."
        className="pl-8 bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/30"
      />
      <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/50 opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  )
}