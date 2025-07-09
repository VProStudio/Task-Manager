import type { Task } from '@/types/index';

export const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return '#4CAF50';
    case 'cancelled':
      return '#F44336';
    case 'in-progress':
      return '#FF9800';
  }
};
