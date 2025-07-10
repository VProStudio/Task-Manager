import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { getCurrentLocationWithTimeout } from '@/utils/taskUtils';
import * as Location from 'expo-location';

interface CurrentLocationButtonProps {
    onLocationChange: (location: string) => void;
}

export const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({ onLocationChange }) => {
    const [loading, setLoading] = useState(false);

    const getCurrentLocation = async () => {
        setLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Location permission is required');
                return;
            }

            const location = await getCurrentLocationWithTimeout();
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (address[0]) {
                const fullAddress = `${address[0].street || ''} ${address[0].city || ''} ${address[0].region || ''}`.trim();
                onLocationChange(fullAddress);
            }
        } catch (error) {
            Alert.alert('Error', 'Could not get current location');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.locationButton, loading && styles.locationButtonDisabled]}
            onPress={getCurrentLocation}
            disabled={loading}
        >
            <Text style={styles.locationButtonText}>
                {loading ? 'Getting...' : 'Current Location'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    locationButton: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
    },
    locationButtonDisabled: {
        backgroundColor: '#ccc',
    },
    locationButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
