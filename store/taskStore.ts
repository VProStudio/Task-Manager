import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import type { Task } from '@/utils/types';

type SortOption = 'date' | 'status' | 'title';

interface TaskStore {
  tasks: Task[];
  sortBy: SortOption;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  deleteTask: (id: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  getSortedTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      sortBy: 'date',

      addTask: (taskData) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...taskData,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      setSortBy: (sortBy) => set({ sortBy }),

      getSortedTasks: () => {
        const { tasks, sortBy } = get();
        return [...tasks].sort((a, b) => {
          switch (sortBy) {
            case 'date':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'status':
              const statusOrder = { 'in-progress': 0, 'completed': 1, 'cancelled': 2 };
              return statusOrder[a.status] - statusOrder[b.status];
            case 'title':
              return a.title.localeCompare(b.title);
            default:
              return 0;
          }
        });
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
