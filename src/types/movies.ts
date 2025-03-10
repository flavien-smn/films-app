export interface Movie {
  id: string;
  title: string;
  poster_path: string;
}

export interface FavoriteMovie extends Movie {
  userId: string;
}