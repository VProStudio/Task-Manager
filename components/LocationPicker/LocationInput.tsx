import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, dimensions } from '@/theme/colors';

interface LocationInputProps {
  value?: string;
  placeholder: string;
  hasError: boolean;
   
  onChangeText: (text: string) => void;
  onFocus: () => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  value,
  placeholder,
  hasError,
  onChangeText,
  onFocus,
}) => (
  <TextInput
    value={value || ''}
    onChangeText={onChangeText}
    onFocus={onFocus}
    placeholder={placeholder}
    style={[styles.input, hasError && styles.inputError]}
  />
);

const styles = StyleSheet.create({
  input: {
    height: dimensions.inputHeight,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
});
