import React from 'react';
import { colors, spacing, borderRadius, shadows } from '@/theme/colors';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getStatusColor } from '@/utils/taskUtils';
import { format } from 'date-fns';
import type { Task } from '@/utils/types';

interface TaskItemProps {
  task: Task;
   
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
   
  onDelete: (taskId: string) => void;
  onPress: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
  onPress,
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

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'completed';

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <View style={styles.header}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(task.status) },
            ]}
          >
            <Text style={styles.statusText}>{task.status}</Text>
          </View>
          <Text
            style={[
              styles.title,
              {
                textDecorationLine:
                  task.status === 'completed' ? 'line-through' : 'none',
                color:
                  task.status === 'cancelled'
                    ? colors.textSecondary
                    : colors.textPrimary,
              },
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
        </View>

        {task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <Text style={styles.dateText}>
            {format(new Date(task.createdAt), 'dd.MM.yyyy')}
          </Text>
          {task.dueDate && (
            <Text style={[styles.dateText, isOverdue && styles.overdueText]}>
              Due: {format(new Date(task.dueDate), 'dd.MM.yyyy')}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => onStatusChange(task.id, getNextStatus(task.status))}
      >
        <Text style={styles.statusButtonText}>⟲</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    ...shadows.md,
  },
  listItem: {
    flex: 1,
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.full,
  },
  statusText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  dateText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  overdueText: {
    color: colors.error,
    fontWeight: 'bold',
  },
  statusButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  statusButtonText: {
    color: colors.textInverse,
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: colors.error,
    borderTopRightRadius: borderRadius.sm,
    borderBottomRightRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  deleteText: {
    color: colors.textInverse,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
