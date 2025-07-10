export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'in-progress' | 'completed' | 'cancelled';
  location?: string;
  createdAt: string;
  dueDate?: string;
  showClearButton?: boolean;
}

export interface LocationPickerProps {
  value?: string;
  onLocationChange: (location: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

export interface NominatimSuggestion {
  display_name: string;
  place_id: string;
}
