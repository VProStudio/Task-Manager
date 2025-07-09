export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'in-progress' | 'completed' | 'cancelled';
  location?: string;
  createdAt: Date;
  dueDate?: Date;
}
