import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CustomDateTimePicker } from '@/components/DateTimePicker';
import { colors, spacing, borderRadius } from '@/theme/colors';

interface DateFieldProps {
    value?: string;
    onDateChange: (date: string) => void;
    onClear: () => void;
}

export const DateField: React.FC<DateFieldProps> = ({ value, onDateChange, onClear }) => (
    <View style={styles.dateContainer}>
        <CustomDateTimePicker value={value} onDateChange={onDateChange} />
        {value && (
            <TouchableOpacity style={styles.clearButton} onPress={onClear}>
                <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
        )}
    </View>
);

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    clearButton: {
        marginLeft: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.error,
        borderRadius: borderRadius.sm,
    },
    clearButtonText: {
        color: colors.textInverse,
        fontWeight: 'bold',
        fontSize: 12,
    },
});