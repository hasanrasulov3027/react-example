// User interface
export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

// Post interface
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Comment interface
export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

// Todo interface
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

// Context state interface
export interface AppState {
  user: {
    name: string;
    email: string;
    roles: string[];
  } | null;
}

// Action types
export type Action =
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'LOG_OUT' }

// Context value interface
export interface ContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

// SelectBox props interface
export interface SelectBoxProps {
  users: User[];
  selectedUser: number;
  setSelectedUser: (userId: number) => void;
}

// Hook return types
export interface UseCommentReturn {
  comments: Comment[];
  isLoading: boolean;
}

export interface UsePostReturn {
  posts: Post[];
  isLoading: boolean;
}

export interface UseTodoReturn {
  todos: Todo[];
  isLoading: boolean;
  getTodos: () => void;
}

export interface UseUsersReturn {
  users: User[];
  isLoading: boolean;
}
