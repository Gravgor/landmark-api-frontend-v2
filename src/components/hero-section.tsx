"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Mail,
  Lock,
  ChevronLeft,
  Building,
  Globe,
  Info,
  Badge,
  Cloud,
  Database,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandmarkModal from "./landmark-modal";
import { useInView } from "react-intersection-observer";
import { TbCategory } from "react-icons/tb";
import { useLandmarkSuggestions } from "@/hooks/use-landmark-suggestion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Image {
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface OpeningHours {
  [key: string]: string;
}

interface TicketPrices {
  [key: string]: string;
}

interface WeatherInfo {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

interface Landmark {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  accessibility_info: string;
  images: Image[];
  image_url: string;
  opening_hours: OpeningHours;
  ticket_prices: TicketPrices;
  visitor_tips: string;
  weather_info: WeatherInfo;
}

interface LandmarkResponse {
  data: Landmark[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}

interface Suggestions {
  cities: string[];
  countries: string[];
  categories: string[];
  names: string[];
}

const searchTypes = [
  { type: "city", icon: Building, label: "Search by City" },
  { type: "country", icon: Globe, label: "Search by Country" },
  { type: "category", icon: TbCategory, label: "Search by Category" },
  { type: "name", icon: MapPin, label: "Search by Name" },
] as const;

type SearchType = (typeof searchTypes)[number]["type"];

const SkeletonItem = () => (
  <div className="px-4 py-2 animate-pulse">
    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
  </div>
);

const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-8 text-center"
  >
    <div className="text-slate-400 mb-2">No results found for</div>
    <div className="text-white font-medium">"{searchTerm}"</div>
    <div className="text-slate-400 mt-2 text-sm">
      Try adjusting your search or changing the search type
    </div>
  </motion.div>
);

const SuggestionsDropdown = ({
  isVisible,
  isLoading,
  error,
  searchTerm,
  suggestions,
  onSuggestionClick,
  onHeightChange
}: {
  isVisible: boolean;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  suggestions: any;
  onSuggestionClick: (suggestion: string) => void;
  onHeightChange: any
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (dropdownRef.current && isVisible) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          onHeightChange(entry.contentRect.height);
        }
      });

      observer.observe(dropdownRef.current);
      return () => observer.disconnect();
    }
  }, [isVisible, onHeightChange]);
  return (
    <div className="absolute left-0 right-0 mb-2" ref={dropdownRef}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-auto bg-slate-800 border border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {isLoading ? (
              <div className="py-2">
                {[...Array(5)].map((_, i) => (
                  <SkeletonItem key={i} />
                ))}
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 text-red-400"
              >
                {error}
              </motion.div>
            ) : !suggestions?.results?.length ? (
              <EmptyState searchTerm={searchTerm} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
              >
                {suggestions.results.map(
                  (suggestion: string, index: number) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-700 text-white transition-colors duration-150 flex items-center gap-2"
                      onClick={() => onSuggestionClick(suggestion)}
                    >
                      <span className="text-blue-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                      {suggestion}
                    </motion.button>
                  )
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(
    null
  );
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isUserActive, setIsUserActive] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<number | null>(null);
  const [searchType, setSearchType] = useState<
    "city" | "country" | "category" | "name"
  >("city");
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [suggestionLastSearchTerm, setSuggestionLastSearchTerm] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const { markAsSelected, suggestions, loading, err, fetchSuggestions } =
    useLandmarkSuggestions();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [shouldKeepShowing, setShouldKeepShowing] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [searchInputHeight, setSearchInputHeight] = useState(0);
  const searchInputRef = useRef(null);

  const { ref: lastLandmarkRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (searchInputRef.current) {
      //@ts-expect-error There is error
      setSearchInputHeight(searchInputRef.current.offsetHeight);
    }
  }, []);

  const handleDropdownHeightChange = useCallback((height: any) => {
    setDropdownHeight(height);
  }, []);

  const getContentOffset = useCallback(() => {
    if (isAnimating || showLandmarks) {
      const baseOffset = -100; // Base offset when suggestions are not shown
      const suggestionsOffset = ((showSuggestions || shouldKeepShowing) && searchTerm.length > 0)
        ? dropdownHeight + searchInputHeight + 20 // Add padding
        : 0;
      return baseOffset + suggestionsOffset;
    }
    return 0;
  }, [isAnimating, showLandmarks, showSuggestions, shouldKeepShowing, searchTerm, dropdownHeight, searchInputHeight]);

  // Update animation timings
  const contentTransition = {
    duration: shouldReduceMotion ? 0 : 0.3,
    ease: "easeInOut"
  };

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setOffset((prevOffset) => prevOffset + 10);
    }
  }, [inView, hasMore, isLoading]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (searchTerm === "") {
      timer = setTimeout(() => {
        setShowLandmarks(false);
        setLastSearchTerm("");
      }, 100000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchTerm]);

  const fetchLandmarks = useCallback(
    async (query: string, offsetValue: number = 0) => {
      if (query.trim()) {
        setIsLoading(true);
        setError(null);
        try {
          const endpoint = `/suggestions/landmarks/${searchType}/${encodeURIComponent(
            query
          )}?offset=${offsetValue}&limit=10`;
          const response = await fetch(
            `https://api.landmark-api.com/api/v1${endpoint}`,
            {
              headers: {
                "x-api-key": "43f79790-bc83-47a5-ad99-ee965c27bc34",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch landmarks");
          }
          const data: LandmarkResponse = await response.json();
          setLandmarks((prevLandmarks) =>
            offsetValue === 0 ? data.data : [...prevLandmarks, ...data.data]
          );
          setShowLandmarks(true);
          setHasMore(data.data.length === 10);
        } catch (err) {
          setError(
            "An error occurred while fetching landmarks. Please try again."
          );
          setLandmarks([]);
        } finally {
          setIsLoading(false);
          setIsAnimating(false);
        }
      }
    },
    [searchType]
  );

  useEffect(() => {
    if (offset > 0 && lastSearchTerm) {
      fetchLandmarks(lastSearchTerm, offset);
    }
  }, [offset, lastSearchTerm, fetchLandmarks]);

  const handleSearch = useCallback(
    (term: string) => {
      setShowSuggestions(false);
      setShouldKeepShowing(false);
      setOffset(0);
      setIsAnimating(true);
      setLastSearchTerm(term);
      setTimeout(() => {
        fetchLandmarks(term);
      }, 1000); // Delay fetch to allow for animation
    },
    [fetchLandmarks]
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setShowSuggestions(false);
    setShouldKeepShowing(false);
    if (e.key === "Enter") {
      e.preventDefault();
      handleFromSuggestion(searchTerm);
      resetInactivityTimer();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const types: Array<"city" | "country" | "category" | "name"> = [
        "city",
        "country",
        "category",
        "name",
      ];
      const currentIndex = types.indexOf(searchType);
      const nextIndex = (currentIndex + 1) % types.length;
      setSearchType(types[nextIndex]);
    }
  };

  const changeSearchType = (type: SearchType) => {
    setSearchType(type);
  };

  useEffect(() => {
    fetchSuggestions(searchTerm, searchType);
  }, [searchTerm, searchType, fetchSuggestions]);

  useEffect(() => {
    if (suggestions.results.length > 1) {
      setShouldKeepShowing(true);
    } else {
      setShouldKeepShowing(false);
    }
  }, [suggestions]);

  const handleFromSuggestion = (suggestion: string) => {
    markAsSelected();
    setSuggestionLastSearchTerm(suggestion);
    setSearchTerm(suggestion); // Set the selected suggestion as the search term
    setShowSuggestions(false);
    setShouldKeepShowing(false); // Reset the should keep showing state
    setOffset(0); // Reset offset for fresh search results
    setIsAnimating(true); // Optionally trigger any animations

    fetchLandmarks(suggestion); // Fetch landmarks based on the selected suggestion
  };

  const handleSuggestionClick = (suggestion: any) => {
    handleFromSuggestion(suggestion);
  };

  const resetInactivityTimer = useCallback(() => {
    // Only reset timer if there is a lastSearchTerm
    if (lastSearchTerm) {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }

      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 300000); // 5 minutes inactivity

      //@ts-ignore
      setInactivityTimer(timer);
    }
  }, [inactivityTimer, lastSearchTerm]);

  const handleModalResponse = useCallback(
    (isUserStillHere: boolean) => {
      setIsModalOpen(false);
      if (!isUserStillHere) {
        setShowLandmarks(false);
      } else {
        resetInactivityTimer();
      }
    },
    [resetInactivityTimer]
  );

  useEffect(() => {
    if (lastSearchTerm) {
      resetInactivityTimer();
    }

    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [resetInactivityTimer, inactivityTimer, lastSearchTerm]);

  const SkeletonCard = () => (
    <div className="bg-white/10 rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
      </div>
    </div>
  );

  const SkeletonTitle = () => (
    <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4 animate-pulse" />
  );

  const SkeletonSearch = () => (
    <div className="w-full h-12 bg-gray-300 rounded-full animate-pulse" />
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeInOut" },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <main className="flex-grow">
        <motion.section
          className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          {/* Tech-focused background pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,27,0.7),rgba(24,24,27,0.9))]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGgtNnYxMmgtNnYtNmgtNnYxMmg2djZoNnYtNmg2eiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-5" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatePresence mode="wait">
              {!isAnimating && !showLandmarks ? (
                <motion.div
                  key="hero"
                  className="text-center space-y-8 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4 mb-6">
                    <a href="https://www.producthunt.com/posts/landmark-api?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-landmark&#0045;api" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=539592&theme=dark" alt="Landmark&#0032;API - Discover&#0032;the&#0032;world&#0039;s&#0032;landmarks | Product Hunt" className="w-[250px] h-[54px]" /></a>

                    </div>
                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight">
                      Global Landmark
                      <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        Data API
                      </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mt-6">
                      Access comprehensive landmark data through our
                      high-performance API. Serving 10,000+ daily requests with
                      99.99% uptime.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                    <div className="p-6 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <Database className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2 text-blue-400">
                        Rich Data
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Geolocation, history, and real-time updates
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <Cloud className="h-8 w-8 text-purple-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2 text-purple-400">
                        High Scale
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Redis-cached responses for lightning speed
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                      <Zap className="h-8 w-8 text-pink-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2 text-pink-400">
                        Live Updates
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Weather, crowds, and transport info
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12">
                    <Link href="#pricing">
                      <Button className="w-full sm:w-auto text-lg px-8 py-3 bg-blue-500 hover:bg-blue-600">
                        Get API Key
                      </Button>
                    </Link>
                    <Link href="/docs">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-lg px-8 py-3 border-slate-700 hover:bg-slate-800"
                      >
                        View Docs
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.h2
                  key="explore"
                  className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: -85 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {isAnimating
                    ? "Searching..."
                    : `Explore landmarks ${
                        searchType === "city"
                          ? `in ${
                              lastSearchTerm
                                ? lastSearchTerm
                                : suggestionLastSearchTerm
                            }`
                          : searchType === "country"
                          ? `of ${
                              lastSearchTerm
                                ? lastSearchTerm
                                : suggestionLastSearchTerm
                            }`
                          : searchType === "category"
                          ? `in the ${
                              lastSearchTerm
                                ? lastSearchTerm
                                : suggestionLastSearchTerm
                            } category`
                          : `named ${
                              lastSearchTerm
                                ? lastSearchTerm
                                : suggestionLastSearchTerm
                            }`
                      }`}
                </motion.h2>
              )}
            </AnimatePresence>
            <motion.div
              className="max-w-3xl mx-auto mt-12"
              initial={{ y: 0 }}
              animate={{ y: isAnimating || showLandmarks ? -100 : 0 }}
              transition={contentTransition}

            >
              <div className="relative group">
                <Input
                ref={searchInputRef}
                  type="text"
                  placeholder={`Search landmarks by ${searchType}...`}
                  className="w-full pl-12 pr-32 py-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={handleKeyPress}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden md:flex space-x-2">
                  {searchTypes.map(({ type, icon: Icon, label }) => (
                    <TooltipProvider key={type}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg p-2 ${
                              searchType === type
                                ? "bg-blue-500 text-white"
                                : "text-slate-400 hover:text-white hover:bg-slate-700"
                            }`}
                            onClick={() => setSearchType(type)}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="sr-only">{type}</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                  <Button
                    className="rounded-lg px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => handleSearch(searchTerm)}
                  >
                    Search
                  </Button>
                </div>

                <SuggestionsDropdown
                  isVisible={
                    (showSuggestions || shouldKeepShowing) &&
                    searchTerm.length > 0
                  }
                  isLoading={isLoading}
                  error={error}
                  searchTerm={searchTerm}
                  suggestions={suggestions}
                  onSuggestionClick={handleSuggestionClick}
                  onHeightChange={handleDropdownHeightChange}
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {(isAnimating || isLoading) && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y:
                    getContentOffset()
                  }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: 0.2,
                    ease: "easeInOut",
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                >
                  {[...Array(8)].map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                  className="text-center mt-8 text-red-500"
                >
                  <p>{error}</p>
                </motion.div>
              )}

              {showLandmarks && !selectedLandmark && !error && !isLoading && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y:
                    getContentOffset()
                  }}
                  exit={{ opacity: 0, y: 50 }}
                >
                  {landmarks.map((landmark, index) => (
                    <motion.div
                      key={landmark.id}
                      ref={
                        index === landmarks.length - 1 ? lastLandmarkRef : null
                      }
                      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer border border-slate-700 hover:border-blue-500 transition-colors"
                      onClick={() => setSelectedLandmark(landmark)}
                      whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative h-48">
                        <img
                          src={
                            landmark.images[0]?.image_url || landmark.image_url
                          }
                          alt={landmark.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {landmark.name}
                        </h3>
                        <p className="text-sm text-slate-300">
                          {landmark.description.slice(0, 100)}...
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {selectedLandmark && (
                <LandmarkModal
                  landmark={selectedLandmark}
                  onClose={() => setSelectedLandmark(null)}
                />
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {!showLandmarks && !isLoading && !isAnimating && (
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="h-8 w-8 text-white/60" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="bg-white rounded-lg p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-black">
                Are you still there?
              </h2>
              <p className="mb-6 text-black">
                We noticed you've been inactive for a while. Would you like to
                continue your search?
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => handleModalResponse(false)}
                  variant="outline"
                  className="text-gray-500"
                >
                  No, I'm done
                </Button>
                <Button onClick={() => handleModalResponse(true)}>
                  Yes, continue
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
