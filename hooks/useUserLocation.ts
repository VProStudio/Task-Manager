import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentLocationWithTimeout } from '@/utils/taskUtils';
import * as Location from 'expo-location';

interface UserLocation {
    country: string;
    region: string;
    city: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [loading, setLoading] = useState(true);

    const getUserLocation = async () => {
        try {
            const savedLocation = await AsyncStorage.getItem('userLocation');
            const savedTimestamp = await AsyncStorage.getItem('locationTimestamp');

            if (savedLocation && savedTimestamp) {
                const timestamp = parseInt(savedTimestamp);
                const now = Date.now();
                const dayInMs = 24 * 60 * 60 * 1000;

                if (now - timestamp < dayInMs) {
                    setUserLocation(JSON.parse(savedLocation));
                    setLoading(false);
                    return;
                }
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLoading(false);
                return;
            }

            const location = await getCurrentLocationWithTimeout();
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (address[0]) {
                const newLocation: UserLocation = {
                    country: address[0].isoCountryCode || 'by',
                    region: address[0].region || '',
                    city: address[0].city || '',
                    coordinates: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }
                };

                await AsyncStorage.setItem('userLocation', JSON.stringify(newLocation));
                await AsyncStorage.setItem('locationTimestamp', Date.now().toString());

                setUserLocation(newLocation);
            }
        } catch (error) {
            console.error('Error getting user location:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    return { userLocation, loading, refreshLocation: getUserLocation };
};