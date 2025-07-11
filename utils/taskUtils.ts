import type { Task } from '@/utils/types';
import { colors } from '@/theme/colors';
import * as Location from 'expo-location';

// Race between location request and timeout to prevent hanging
export const getCurrentLocationWithTimeout = (timeoutMs: number = 10000) => {
  return Promise.race([
    Location.getCurrentPositionAsync({}),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Location timeout')), timeoutMs)
    ),
  ]);
};

export const formatAddress = (displayName: string) => {
  const parts = displayName.split(', ');
  return parts.slice(0, 3).join(', ');
};

export const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return colors.success;
    case 'cancelled':
      return colors.error;
    case 'in-progress':
      return colors.warning;
  }
};
