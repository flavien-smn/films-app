import { db } from '~/src/services/config/firebase';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const updateSearchCount = async (querySearch: string, movie: Movie) => {
  try {
    console.log('updateSearchCount  : ', querySearch, movie);
    const q = query(
      collection(db, 'metrics'),
      where('searchTerm', '==', querySearch),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      const existingMovie = querySnapshot.docs[0];
      const movieData = existingMovie.data();

      const currentCount = movieData.count || 0;

      await updateDoc(existingMovie.ref, { count: currentCount + 1 });
    } else {
      //TODO: Add the movie to the metrics collection
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des résultats :', error);
  }
};
