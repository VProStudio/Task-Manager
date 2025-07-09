import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useTaskStore } from '@/store/taskStore';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'react-native-elements';
import type { Task } from '@/types/index';

type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'status' | 'dueDate'> & {
  dueDate?: string;
};

export const AddTaskScreen = ({ navigation }: any) => {
  const { addTask } = useTaskStore();

  const schema = yup.object().shape({
    title: yup.string().required('Name is necessarily'),
    description: yup.string().optional(),
    location: yup.string().optional(),
    dueDate: yup.string().optional(),
  });

  const { control, handleSubmit } = useForm<TaskFormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    addTask({
      title: data.title,
      description: data.description,
      status: 'in-progress',
      location: data.location,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            placeholder="Call ur task"
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            placeholder="Describe it task"
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="dueDate"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            placeholder="When deadline?"
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            placeholder="Location"
            style={styles.input}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSubmit(onSubmit)}
          title="Save"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
        <Button
          onPress={() => navigation.goBack()}
          title="Cancel"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 16,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
