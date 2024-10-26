import { Building, Globe, MapPin } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { TbCategory } from "react-icons/tb";

type SearchType = 'city' | 'country' | 'category' | 'name';

interface SearchTypeConfig {
  type: SearchType;
  icon: React.ComponentType;
  label: string;
}

const searchTypes: SearchTypeConfig[] = [
  { type: 'city', icon: Building, label: 'Search by City' },
  { type: 'country', icon: Globe, label: 'Search by Country' },
  { type: 'category', icon: TbCategory, label: 'Search by Category' },
  { type: 'name', icon: MapPin, label: 'Search by Name' },
];

interface Suggestions {
  results: string[];
}

export const useLandmarkSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestions>({ results: [] });
  const [loading, setIsLoading] = useState(false);
  const [err, setError] = useState<string | null>(null);
  
  const selectedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchedTerms: Set<string> = useRef(new Set<string>()).current;

  const markAsSelected = useCallback(() => {
    selectedRef.current = true;
    setTimeout(() => {
      selectedRef.current = false;
    }, 500);
  }, []);

  const fetchSuggestions = async (searchTerm: string, searchType: SearchType) => {
    if (searchedTerms.has(searchTerm) || selectedRef.current) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    searchedTerms.add(searchTerm);

    try {
      const response = await fetch(
        `https://api.landmark-api.com/api/v1/suggestions/${searchType}?search=${searchTerm}`,
        {
          headers: {
            "x-api-key": "43f79790-bc83-47a5-ad99-ee965c27bc34",
          },
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) throw new Error('Failed to fetch suggestions');

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    suggestions,
    loading,
    err,
    fetchSuggestions,
    markAsSelected,
  };
};
