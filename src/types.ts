export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  genre: string[];
  rating: string; // e.g., "PG-13", "R"
  userScore: number; // e.g., 94 for 94% match
  releaseYear: number;
  duration: string; // e.g., "2h 15m"
  director: string;
  cast: string[];
  posterUrl: string; // 2:3 portrait aspect ratio
  backdropUrl: string; // 16:9 landscape aspect ratio
  isTrending: boolean;
  isPopular: boolean;
  scenes: { time: string; title: string; desc: string }[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarId: string;
  joinedDate: string;
  favoriteGenre: string;
  watchTimeMinutes: number;
}

export interface WatchItem {
  movieId: string;
  progressPercent: number; // 0 - 100
  lastWatchedAt: string;
}

export type ActiveTab = 'home' | 'search' | 'mylist' | 'ai-recs' | 'profile';
