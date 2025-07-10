import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { formatAddress } from '@/utils/taskUtils';
import type { NominatimSuggestion } from '@/utils/types';

interface SuggestionsListProps {
    suggestions: NominatimSuggestion[];
    isSearching: boolean;
    showSuggestions: boolean;
    onSelectSuggestion: (suggestion: NominatimSuggestion) => void;
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
    suggestions, isSearching, onSelectSuggestion
}) => {
    if (isSearching && suggestions.length === 0) {
        return (
            <View style={styles.searchingIndicator}>
                <Text style={styles.searchingText}>Search...</Text>
            </View>
        );
    }

    if (suggestions.length === 0 && !isSearching) return null;

    return (
        <ScrollView style={styles.suggestionsList} keyboardShouldPersistTaps="handled">
            {suggestions.map((item) => (
                <TouchableOpacity
                    key={item.place_id}
                    style={styles.suggestionItem}
                    onPress={() => onSelectSuggestion(item)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.suggestionText} numberOfLines={2}>
                        {formatAddress(item.display_name)}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    suggestionsList: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#ddd',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 1001,
    },
    suggestionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    suggestionText: {
        fontSize: 14,
        color: '#333',
    },
    searchingIndicator: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        zIndex: 1001,
    },
    searchingText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 14,
    },
});
