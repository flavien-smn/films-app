export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGFhMzRlODBhYjhiZjFjNjUwZDZkODg3NGVhMjlmNyIsIm5iZiI6MTY3OTkyNTIwMi45MjcsInN1YiI6IjY0MjE5ZmQyMmRjOWRjMDBiZjU5OTNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B_Qi_yRMcmprZMDc-gS_cKiN7A5ezHGQZ6EEDEhSwVc`,
    Authorization: 'Bearer ' + process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  },
};

export const fetchMovies = async (query: string): Promise<any[]> => {
  try {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/movie/popular?sort_by=popularity.desc`;

    // const endpoint =
    //   'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

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
//
// const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGFhMzRlODBhYjhiZjFjNjUwZDZkODg3NGVhMjlmNyIsIm5iZiI6MTY3OTkyNTIwMi45MjcsInN1YiI6IjY0MjE5ZmQyMmRjOWRjMDBiZjU5OTNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B_Qi_yRMcmprZMDc-gS_cKiN7A5ezHGQZ6EEDEhSwVc',
//   },
// };
//
// export const fetchTrendingMovies = async () => {
//   fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log('res trending : ', json))
//     .catch(err => console.error(err));
// };
