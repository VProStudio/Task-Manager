import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import type { Task } from '@/types/index';
import { getStatusColor } from '@/utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
}) => {
  const getNextStatus = (currentStatus: Task['status']): Task['status'] => {
    switch (currentStatus) {
      case 'in-progress':
        return 'completed';
      case 'completed':
        return 'cancelled';
      case 'cancelled':
        return 'in-progress';
    }
  };

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => onStatusChange(task.id, getNextStatus(task.status))}
      >
        <Text
          style={[
            styles.title,
            {
              textDecorationLine:
                task.status === 'completed' ? 'line-through' : 'none',
              color: task.status === 'cancelled' ? '#999' : '#000',
            },
          ]}
        >
          {task.title}
        </Text>
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
        <View style={styles.statusRow}>
          <Text
            style={[styles.statusText, { color: getStatusColor(task.status) }]}
          >
            {task.status}
          </Text>
          <Text style={styles.dateText}>
            {format(task.createdAt, 'dd.MM.yyyy HH:mm')}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    minHeight: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItem: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  dateText: {
    color: '#999',
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
