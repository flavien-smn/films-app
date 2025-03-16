import { db } from '~/src/services/config/firebase';
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const updateSearchCount = async (querySearch: string, movie: Movie) => {
  try {
    const q = query(
      collection(db, 'metrics'),
      where('searchTerm', '==', querySearch.toLowerCase()),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      const existingMovie = querySnapshot.docs[0];
      const movieData = existingMovie.data();

      const currentCount = movieData.count || 0;

      await updateDoc(existingMovie.ref, { count: currentCount + 1 });
    } else {
      await addDoc(collection(db, 'metrics'), {
        count: 1,
        movieId: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        searchTerm: querySearch.toLowerCase(),
        movieTitle: movie.title,
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'update du compteur de recherche :", error);
  }
};
