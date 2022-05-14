export interface Memory {
  _id: string;
  title: string;
  description: string;
  userId: string;
  createdDate: string;
  likes: number;
  __v: number;
  userPhoto: string;
  photoUrls: string[];
  likedUsers: string[];
  favCount: number;
}

export interface AuthState {
  loading: boolean;
  user: null;
  error: null;
}

export interface PostState {
  loading: boolean;
  error: Error | null;
  memories: Memory[];
  memory: Memory | null;
  likedMemoryError: Error | null;
  likedMemories: Memory[];
  likedMemoryLoading: boolean;
  memoryLoading: boolean;
  memoryError: Error | null;
  favMemories: Memory[];
  favMemoryLoading: boolean;
  favMemoryError: Error | null;
}

export interface Error {
  message: string;
  statusCode: number;
  requestStatus: "Fail";
}
