import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { LocationPicker } from '@/components/LocationPicker/LocationPicker';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FormField } from '@/components/TaskForm/FormField';
import { DateField } from '@/components/TaskForm/DateField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTaskStore } from '@/store/taskStore';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import type { Task } from '@/utils/types';

type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'status' | 'dueDate'> & {
  dueDate?: string;
};

export const AddTaskScreen = ({ navigation }: any) => {
  const { tasks, addTask } = useTaskStore();


  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Title is required')
      .min(3, 'Minimum 3 characters')
      .max(100, 'Maximum 100 characters')
      .test('unique-title', 'Task with this name already exists', (value) => {
        if (!value) return true;
        return !tasks.some(task => task.title.toLowerCase() === value.toLowerCase());
      }),
    description: yup
      .string()
      .max(500, 'Maximum 500 characters'),
    dueDate: yup
      .string()
      .test('future-date', 'Date cannot be in the past', (value) => {
        if (!value) return true;
        return new Date(value) > new Date();
      }),
    location: yup.string().optional(),
  });

  const { control, handleSubmit, setValue, watch } = useForm<TaskFormData>({
    resolver: yupResolver(schema) as any,
  });

  const dueDate = watch('dueDate');

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    addTask({
      title: data.title,
      description: data.description,
      status: 'in-progress',
      location: data.location,
      dueDate: data.dueDate,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormField error={error?.message}>
            <TextInput
              value={value || ''}
              onChangeText={onChange}
              placeholder="Call ur task"
              style={[styles.input, error && styles.inputError]}
            />
          </FormField>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormField error={error?.message}>
            <TextInput
              value={value || ''}
              onChangeText={onChange}
              placeholder="Describe it task"
              style={[styles.input, error && styles.inputError]}
            />
          </FormField>
        )}
      />

      <DateField
        value={dueDate}
        onDateChange={(date) => setValue('dueDate', date)}
        onClear={() => setValue('dueDate', undefined)}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormField error={error?.message}>
            <LocationPicker
              value={value}
              onLocationChange={onChange}
              placeholder="Location"
              hasError={!!error}
            />
          </FormField>
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
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: spacing.lg,
  },
  button: {
    marginHorizontal: spacing.md,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});