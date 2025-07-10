import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface LocationInputProps {
    value?: string;
    placeholder: string;
    hasError: boolean;
    onChangeText: (text: string) => void;
    onFocus: () => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
    value, placeholder, hasError, onChangeText, onFocus
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
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#ff4444',
        borderWidth: 2,
    },
});
