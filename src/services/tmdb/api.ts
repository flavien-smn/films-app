export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  },
};

export enum QueryTypes {
  trending = 'trending',
  now_playing = 'now_playing',
  popular = 'popular',
  search = 'search',
}

export const fetchMovies = async (
  queryType: QueryTypes,
  query: string,
): Promise<Movie[]> => {
  try {
    let endpoint: string;
    switch (queryType) {
      case QueryTypes.trending:
        endpoint = `${TMDB_CONFIG.BASE_URL}/trending/movie/week?language=fr-FR`;
        break;
      case QueryTypes.popular:
        endpoint = `${TMDB_CONFIG.BASE_URL}/movie/popular?sort_by=popularity.desc&language=fr-FR`;
        break;
      case QueryTypes.now_playing:
        endpoint = `${TMDB_CONFIG.BASE_URL}/movie/now_playing?language=fr-FR&page=1&region=FR&sort_by=popularity.desc`;
        break;
      case QueryTypes.search:
      default:
        // search
        endpoint = `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=true&language=fr-FR&region=FR`;
        break;
    }

    console.log('Fetching movies from endpoint:', endpoint);
    console.log('Using API Key:', TMDB_CONFIG.API_KEY);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
    });
    console.log('Response status:', response);
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

export const fetchMovieDetails = async (
  movieId: string,
): Promise<MovieDetails> => {
  try {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?language=fr-FR`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch movie details: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in fetchMovieDetails:', error);
    throw error; // Permet à celui qui appelle la fonction de gérer l'erreur
  }
};
