import React, { useState } from 'react';
import { CurrentLocationButton } from './CurrentLocationButton';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LocationModal } from './LocationModal';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  dimensions,
} from '@/theme/colors';
import type { LocationPickerProps } from '@/utils/types';

export const LocationPicker: React.FC<LocationPickerProps> = ({
  value,
  onLocationChange,
  placeholder = 'Location',
  hasError = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (location: string) => {
    onLocationChange(location);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.input, hasError && styles.inputError]}
        onPress={() => setShowModal(true)}
      >
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      <LocationModal
        visible={showModal}
        initialValue={value}
        onSelect={handleSelect}
        onClose={() => setShowModal(false)}
      />

      <CurrentLocationButton onLocationChange={onLocationChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  input: {
    height: dimensions.inputHeight,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  inputText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.textSecondary,
  },
});
