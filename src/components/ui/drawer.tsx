import { Text, TouchableOpacity } from 'react-native';
import { useDrawer } from '~/src/contexts/drawerContext';
import { AnimatePresence, MotiView } from 'moti';
import { useAuth } from '~/src/contexts/authContext';

export const Drawer = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const { currentUser, logout } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <MotiView
          from={{ translateX: -300 }}
          animate={{ translateX: 0 }}
          exit={{ translateX: -300 }}
          transition={{ type: 'timing', duration: 300 }}
          className='absolute left-0 top-0 bottom-0 w-3/4 bg-white p-4 z-50'
        >
          <TouchableOpacity onPress={closeDrawer}>
            <Text>Fermer</Text>
          </TouchableOpacity>
          <Text>{currentUser?.email}</Text>
          <TouchableOpacity onPress={logout}>
            <Text>Déconnexion</Text>
          </TouchableOpacity>
        </MotiView>
      )}
    </AnimatePresence>
  );
};
