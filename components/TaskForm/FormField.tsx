import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme/colors';

interface FormFieldProps {
  children: React.ReactNode;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ children, error }) => (
  <View style={styles.fieldContainer}>
    {children}
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
