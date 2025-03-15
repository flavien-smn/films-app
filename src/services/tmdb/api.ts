export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  },
};

export const fetchMovies = async (query: string): Promise<any[]> => {
  try {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/movie/popular?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      const errorMessage = `Failed to fetch movies: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error('Error in fetchMovies:', error);
    throw error; // Permet à celui qui appelle la fonction de gérer l'erreur
  }
};
