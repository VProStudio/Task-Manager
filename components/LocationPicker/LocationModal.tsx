import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import { colors, spacing, borderRadius, dimensions } from '@/theme/colors';
import { formatAddress } from '@/utils/taskUtils';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import type { NominatimSuggestion } from '@/utils/types';

interface LocationModalProps {
  visible: boolean;
  initialValue?: string;
   
  onSelect: (location: string) => void;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  initialValue,
  onSelect,
  onClose,
}) => {
  const [searchText, setSearchText] = useState(initialValue || '');
  const { suggestions, debouncedSearch } = useLocationSearch();

  useEffect(() => {
    if (visible) {
      setSearchText(initialValue || '');
    }
  }, [visible, initialValue]);

  const handleTextChange = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  const handleSelect = (suggestion: NominatimSuggestion) => {
    const address = formatAddress(suggestion.display_name);
    onSelect(address);
    onClose();
  };

  const handleSave = () => {
    onSelect(searchText);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Location</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={handleTextChange}
          placeholder="Enter location"
          autoFocus
        />

        <ScrollView style={styles.suggestions}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.place_id}
              style={styles.suggestionItem}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.suggestionText}>
                {formatAddress(item.display_name)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary + '20',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  cancelText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  saveText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  input: {
    margin: spacing.lg,
    height: dimensions.inputHeight,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    backgroundColor: colors.surface,
  },
  suggestions: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  suggestionItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary + '20',
  },
  suggestionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});
