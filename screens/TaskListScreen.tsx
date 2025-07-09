import React from 'react';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { useTaskStore } from '@/store/taskStore';
import { TaskItem } from '@/components/TaskItem';
import type { Task } from '@/types/index';

export const TaskListScreen = ({ navigation }: any) => {
  const { tasks, updateTaskStatus, deleteTask } = useTaskStore();

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onStatusChange={updateTaskStatus}
      onDelete={deleteTask}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Add task"
        onPress={() => navigation.navigate('AddTask')}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};
