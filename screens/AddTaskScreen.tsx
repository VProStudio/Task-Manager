import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LocationPicker } from '@/components/LocationPicker/LocationPicker';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  dimensions,
} from '@/theme/colors';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FormField } from '@/components/TaskForm/FormField';
import { DateField } from '@/components/TaskForm/DateField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTaskStore } from '@/store/taskStore';
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
      .max(50, 'Maximum 50 characters')
      .test('unique-title', 'Task with this name already exists', (value) => {
        if (!value) return true;
        return !tasks.some(
          (task) => task.title.toLowerCase() === value.toLowerCase()
        );
      }),
    description: yup.string().max(500, 'Maximum 500 characters'),
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create New Task</Text>
          <Text style={styles.subtitle}>Fill in the details below</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Task Title *</Text>
                <FormField error={error?.message}>
                  <TextInput
                    value={value || ''}
                    onChangeText={onChange}
                    placeholder="Enter task title"
                    style={[styles.input, error && styles.inputError]}
                    placeholderTextColor={colors.textSecondary}
                  />
                </FormField>
              </View>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Description</Text>
                <FormField error={error?.message}>
                  <TextInput
                    value={value || ''}
                    onChangeText={onChange}
                    placeholder="Add description (optional)"
                    style={[styles.textArea, error && styles.inputError]}
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </FormField>
              </View>
            )}
          />

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Due Date</Text>
            <DateField
              value={dueDate}
              onDateChange={(date) => setValue('dueDate', date)}
              onClear={() => setValue('dueDate', undefined)}
            />
          </View>

          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Location</Text>
                <FormField error={error?.message}>
                  <LocationPicker
                    value={value}
                    onLocationChange={onChange}
                    placeholder="Add location (optional)"
                    hasError={!!error}
                  />
                </FormField>
              </View>
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.saveButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  form: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  fieldWrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    ...shadows.md,
  },
  textArea: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    ...shadows.md,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.textSecondary + '20',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    height: dimensions.buttonHeight,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textInverse,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
