import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface DateTimePickerProps {
    value?: string;
    onDateChange: (date: string) => void;
    placeholder?: string;
}

export const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
    value,
    onDateChange,
    placeholder = 'Select date',
}) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const showPickers = () => {
        DateTimePickerAndroid.open({
            value: value ? new Date(value) : new Date(),
            minimumDate: today,
            onChange: (_, selectedDate) => {
                if (selectedDate) {
                    DateTimePickerAndroid.open({
                        value: selectedDate,
                        onChange: (_, selectedTime) => {
                            if (selectedTime) {
                                selectedDate.setHours(selectedTime.getHours());
                                selectedDate.setMinutes(selectedTime.getMinutes());
                                onDateChange(selectedDate.toISOString());
                            }
                        },
                        mode: 'time',
                    });
                }
            },
            mode: 'date',
        });
    };

    return (
        <TouchableOpacity style={styles.dateButton} onPress={showPickers}>
            <Text style={styles.dateButtonText}>
                {value ? format(new Date(value), 'dd.MM.yyyy HH:mm') : placeholder}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dateButton: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
        alignSelf: 'center',
        marginHorizontal: 16,
    },
});
