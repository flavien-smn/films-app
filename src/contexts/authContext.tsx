import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../services/config/firebase';

// Typage du contexte
interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Crée le contexte avec des valeurs par défaut
const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

// Hook permettant d'avoir les valeurs du context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider pour suivre l'utilisateur connecté
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Gestion Firebase : écoute de la connexion utilisateur
  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Erreur de connexion :', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('erreur deconnexion');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
