import React from 'react';
import { colors, spacing, borderRadius, shadows } from '@/theme/colors';
import { View, FlatList, StyleSheet } from 'react-native';
import { SortPicker } from '@/components/SortPicker';
import { Picker } from '@react-native-picker/picker';
import { useTaskStore } from '@/store/taskStore';
import { TaskItem } from '@/components/TaskItem';
import { Button } from 'react-native-elements';
import type { Task } from '@/utils/types';

export const TaskListScreen = ({ navigation }: any) => {
  const { getSortedTasks, updateTaskStatus, deleteTask, sortBy, setSortBy } = useTaskStore();
  const tasks = getSortedTasks();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SortPicker sortBy={sortBy} setSortBy={setSortBy} />
      ),
    });
  }, [navigation, sortBy, setSortBy]);

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onStatusChange={updateTaskStatus}
      onDelete={deleteTask}
      onPress={() => navigation.navigate('TaskDetail', { task: item })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <Button
        title="Add task"
        onPress={() => navigation.navigate('AddTask')}
        buttonStyle={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  addButton: {
    margin: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    height: 50,
  },
});