import { useState, useRef } from 'react';
import { useUserLocation } from '@/hooks/useUserLocation';
import type { NominatimSuggestion } from '@/utils/types';

export const useLocationSearch = () => {
    const [suggestions, setSuggestions] = useState<NominatimSuggestion[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const { userLocation } = useUserLocation();
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const searchAddresses = async (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        try {
            let searchQuery = query;
            const countryCode = userLocation?.country || 'by';

            if (userLocation?.city) {
                searchQuery = `${query}, ${userLocation.city}`;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1&accept-language=ru&countrycodes=${countryCode}`,
                { headers: { 'User-Agent': 'TodoApp/1.0' } }
            );

            if (!response.ok) return;

            const text = await response.text();
            if (!text || text.startsWith('<')) return;

            const data = JSON.parse(text);
            if (Array.isArray(data)) {
                setSuggestions(data);
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const debouncedSearch = (query: string) => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => searchAddresses(query), 500);
    };

    return { suggestions, isSearching, debouncedSearch, setSuggestions };
};
