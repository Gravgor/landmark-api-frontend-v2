//@ts-nocheck
"use client"
import Link from "next/link"
import { MapPin, Menu, X, User, Search, ChevronDown, Globe, Database, Zap } from "lucide-react"
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
    icon: <Database className="w-4 h-4 mr-2" />,
    href: "#products",
    subItems: [
      { 
        name: "Landmark API", 
        description: "Access global landmark data through our high-performance API",
        href: "/pricing",
        icon: <Globe className="w-4 h-4" />
      },
      {
        name: "Live Updates",
        description: "Real-time weather, crowds, and transport information",
        href: "/live-updates",
        icon: <Zap className="w-4 h-4" />
      }
    ]
  },
  { 
    name: "Resources",
    icon: <ChevronDown className="w-4 h-4 ml-1" />,
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
      className="sticky top-0 z-50 w-full backdrop-blur-lg bg-gradient-to-r from-blue-950/90 to-purple-950/90 border-b border-white/10 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <MainNav />
          <div className="ml-auto md:hidden">
            <MobileNav />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/pricing">
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20"
                >
                  Get API Key
                </Button>
              </Link>
              <Link href="/auth">
                <Button 
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
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
  )
}

function MainNav() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-lg"
        >
          <MapPin className="h-6 w-6 text-white" />
        </motion.div>
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-bold text-xl text-white">Landmark API</span>
          <span className="text-xs text-blue-300">10000+ landmarks</span>
        </motion.div>
      </Link>
      <NavigationMenu className="hidden md:flex ml-8">
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              {item.subItems ? (
                <>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-blue-300 flex items-center">
                    {item.icon}
                    {item.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl shadow-xl border border-white/10">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className="flex items-center space-x-4 rounded-lg p-3 hover:bg-white/5 transition-colors"
                            >
                              {subItem.icon && (
                                <div className="bg-blue-500/10 p-2 rounded-lg">
                                  {subItem.icon}
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-white">{subItem.name}</div>
                                {subItem.description && (
                                  <div className="text-xs text-gray-400">{subItem.description}</div>
                                )}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={item.href} className="flex items-center px-4 py-2 text-sm text-white hover:text-blue-300">
                  {item.icon}
                  {item.name}
                </Link>
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
          className="px-0 text-white hover:bg-white/10"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-gradient-to-b from-blue-950 to-purple-950 border-l border-white/10">
        <Link href="/" className="flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <span className="ml-2 font-bold text-xl text-white">Landmark API</span>
        </Link>
        <nav className="mt-8 flex flex-col space-y-4">
          {navItems.map((item) => (
            <div key={item.name} className="space-y-3">
              <div className="flex items-center text-lg font-semibold text-white">
                {item.icon}
                {item.name}
              </div>
              {item.subItems && (
                <div className="ml-4 space-y-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-300 transition-colors"
                    >
                      {subItem.icon && <div className="opacity-75">{subItem.icon}</div>}
                      <span>{subItem.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/auth" className="flex items-center space-x-2 text-lg font-semibold text-white hover:text-blue-300">
            <User className="h-5 w-5" />
            <span>Sign In</span>
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
        placeholder="Search landmarks..."
        className="w-[300px] pl-8 bg-white/5 border-white/10 text-white placeholder-white/50 focus:bg-white/10 focus:border-white/20"
      />
      <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/50 opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  )
}

export default Navbar;