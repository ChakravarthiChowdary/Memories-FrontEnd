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
  user: User | null;
  error: null;
  updateProfileLoading: boolean;
  updateProfileError: Error | null;
  updateProfileSuccess: boolean;
  autoLoginLoading: boolean;
  signUpSuccess: boolean;
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
  postMemoryLoading: boolean;
  postMemoryError: Error | null;
  postMemorySuccess: boolean;
  location: string;
  searchText: string;
  myPosts: Memory[];
  myPostsLoading: boolean;
  myPostsError: Error | null;
}

export interface Error {
  message: string;
  statusCode: number;
  requestStatus: "Fail";
}

export interface User {
  username: string;
  id: string;
  email: string;
  photoUrl: string;
  token: string;
  expiresIn: string;
}
