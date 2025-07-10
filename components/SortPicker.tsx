import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, spacing, borderRadius } from '@/theme/colors';

type SortOption = 'date' | 'status' | 'title';

interface SortPickerProps {
    sortBy: SortOption;
    setSortBy: (sortBy: SortOption) => void;
}

export const SortPicker: React.FC<SortPickerProps> = ({ sortBy, setSortBy }) => {
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={sortBy}
                onValueChange={setSortBy}
                style={styles.picker}
                dropdownIconColor={colors.textInverse}
            >
                <Picker.Item label="Date" value="date" />
                <Picker.Item label="Status" value="status" />
                <Picker.Item label="Title" value="title" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.overlay,
        borderRadius: borderRadius.sm,
        width: 100,
        height: 35,
        marginRight: spacing.sm,
        justifyContent: 'center',
    },
    picker: {
        height: 35,
        color: colors.textInverse,
        fontSize: 14,
    },
});