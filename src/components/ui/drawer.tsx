import { Pressable, Text } from 'react-native';
import { useDrawer } from '~/src/contexts/drawerContext';
import { AnimatePresence, MotiView } from 'moti';

export const Drawer = () => {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <AnimatePresence>
      {isOpen && (
        <MotiView
          from={{ translateX: -300 }}
          animate={{ translateX: 0 }}
          exit={{ translateX: -300 }}
          transition={{ type: 'timing', duration: 300 }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '70%',
            backgroundColor: 'white',
            zIndex: 1000,
            padding: 20,
          }}
        >
          <Text className='text-lg font-bold mb-4'>Profil</Text>

          <Pressable onPress={closeDrawer}>
            <Text>Fermer</Text>
          </Pressable>
        </MotiView>
      )}
    </AnimatePresence>
  );
};
