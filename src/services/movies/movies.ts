import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FavoriteMovie, Movie } from '~/src/types/movies';


// Ajouter un film favori
export const addFavoriteMovie = async (userId: string, movie: Movie): Promise<void> => {
  const movieData: FavoriteMovie = { ...movie, userId };
  await addDoc(collection(db, 'favorites'), movieData);
};

// Récupérer les films favoris d'un utilisateur
export const getUserFavorites = async (userId: string): Promise<FavoriteMovie[]> => {
  const q = query(collection(db, 'favorites'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as FavoriteMovie);
};