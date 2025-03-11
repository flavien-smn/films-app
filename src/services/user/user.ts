import { UserData } from '~/src/types/user';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '~/src/services/firebase';

export const signUpNewUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  username: string,
  photoURL: string | null,
) => {
  try {
    // 1. Création de l'utilisateur (auth)
    const userCredential = await registerUser(email, password);
    // 2. Stockage des informations complémentaires dans Firestore
    const userData: UserData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
      firstName,
      lastName,
      username,
      photoURL: photoURL,
    };

    await saveUserData(userData);

    console.log('Utilisateur inscrit avec succès !');
    return userData;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

export const saveUserData = async (userData: UserData) => {
  await setDoc(doc(db, 'users', userData.uid), userData);
};
