import React, { useState, useEffect } from 'react';
import { CurrentLocationButton } from './CurrentLocationButton';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { SuggestionsList } from './SuggestionsList';
import { View, StyleSheet } from 'react-native';
import { LocationInput } from './LocationInput';
import { formatAddress } from '@/utils/taskUtils';
import type { LocationPickerProps, NominatimSuggestion } from '@/utils/types';

export const LocationPicker: React.FC<LocationPickerProps> = ({
    value, onLocationChange, placeholder = "Location", hasError = false,
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { suggestions, isSearching, debouncedSearch, setSuggestions } = useLocationSearch();

    useEffect(() => {
        if (suggestions.length > 0) {
            setShowSuggestions(true);
        }
    }, [suggestions]);

    const handleInputChange = (text: string) => {
        onLocationChange(text);
        if (text.length === 0) {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        debouncedSearch(text);
    };

    const selectSuggestion = (suggestion: NominatimSuggestion) => {
        onLocationChange(formatAddress(suggestion.display_name));
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleInputFocus = () => {
        if (suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    return (
        <View style={styles.container}>
            <LocationInput
                value={value}
                placeholder={placeholder}
                hasError={hasError}
                onChangeText={handleInputChange}
                onFocus={handleInputFocus}
            />

            <SuggestionsList
                suggestions={suggestions}
                isSearching={isSearching}
                showSuggestions={showSuggestions}
                onSelectSuggestion={selectSuggestion}
            />

            <CurrentLocationButton onLocationChange={onLocationChange} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
        zIndex: 1000,
    },
});