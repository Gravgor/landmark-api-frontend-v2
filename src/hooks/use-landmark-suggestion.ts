import { debounce } from "lodash";
import { Building, Globe, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const [suggestions, setSuggestions] = useState<Suggestions>({
    results: []
  });
  const [loading, setIsLoading] = useState(false);
  const [err, setError] = useState<string | null>(null);
  
  // Use a ref to track if a suggestion was recently selected
  const selectedRef = useRef(false);
  // Use a ref to store the current abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  // Reset function to clear the selected state after a delay
  const resetSelected = debounce(() => {
    selectedRef.current = false;
  }, 500);

  // Function to mark a suggestion as selected
  const markAsSelected = () => {
    selectedRef.current = true;
    resetSelected();
  };

  const fetchSuggestions = async (searchTerm: string, searchType: SearchType) => {
    // Don't fetch if a suggestion was recently selected
    if (selectedRef.current || !searchTerm) {
      setSuggestions({ results: [] });
      return;
    }

    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.landmark-api.com/api/v1/suggestions/${searchType}?search=${searchTerm}`,
        {
          headers: {
            "x-api-key": "43f79790-bc83-47a5-ad99-ee965c27bc34",
          },
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok) throw new Error('Failed to fetch suggestions');

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      // Only set error if it's not an abort error
      if (error instanceof Error && error.name !== 'AbortError') {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const debouncedFetch = debounce(fetchSuggestions, 300);

  return {
    suggestions,
    loading,
    err,
    fetchSuggestions: debouncedFetch,
    markAsSelected, // Expose the function to mark a suggestion as selected
  };
};