import { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '~/src/components/ui/Icon';
import { Text } from '~/src/components/ui/text';
import { useAuth } from '~/src/contexts/authContext';
import { useDrawer } from '~/src/contexts/drawerContext';
import { useColorScheme } from '~/src/lib/useColorScheme';

const { width } = Dimensions.get('window');
const drawerWidth = width * 0.90;

export const Drawer = () => {
  const { currentUser, logout } = useAuth();
  const { isDarkColorScheme } = useColorScheme();
  const { isOpen, closeDrawer } = useDrawer();

  const translateX = useSharedValue(-drawerWidth);
  const backdropOpacity = useSharedValue(0);

  // ✅ Gérer le montage
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      translateX.value = withTiming(0, { duration: 300 });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      // ➡️ Fermer avec animation puis démonter
      translateX.value = withTiming(
        -drawerWidth,
        { duration: 300 },
        finished => {
          if (finished) {
            runOnJS(setIsMounted)(false);
          }
        },
      );
      backdropOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [isOpen]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  // ✅ On monte le drawer seulement quand il doit exister
  if (!isMounted || !currentUser) return null;

  return (
    <View className='absolute inset-0 z-50'>
      {/* Backdrop animé */}
      <Animated.View
        style={[
          backdropStyle,
          { position: 'absolute', inset: 0, backgroundColor: 'black' },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeDrawer}
          className='w-full h-full'
        />
      </Animated.View>

      {/* Drawer animé */}
      <Animated.View
        style={[
          drawerStyle,
          {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: drawerWidth,
            padding: 20,
          },
        ]}
        className='dark:bg-neutral-800 bg-neutral-100'
      >
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          {/* Header */}
          <View className='flex-row justify-between items-center mb-6'>
            <Text className='text-xl font-bold'>Mon Profil</Text>
            <TouchableOpacity onPress={closeDrawer}>
              <Icon
                name='XMarkIcon'
                size={28}
                color={isDarkColorScheme ? 'white' : 'black'}
                solid={false}
              />
            </TouchableOpacity>
          </View>

          {/* Infos user */}
          <View className='space-y-2 mb-8'>
            <View className='w-16 h-16 rounded-full bg-gray-300 items-center justify-center'>
              <Icon name='UserIcon' size={32} color='gray' solid={false} />
            </View>
            <Text className='text-lg font-semibold'>
              {currentUser.displayName || 'Utilisateur'}
            </Text>
            <Text className='text-gray-500'>{currentUser.email}</Text>
          </View>

          {/* Actions */}
          <View className='space-y-4'>
            <TouchableOpacity className='flex-row items-center space-x-3'>
              <Icon
                name='Cog8ToothIcon'
                size={24}
                color={isDarkColorScheme ? 'white' : 'black'}
                solid={false}
              />
              <Text className='text-base'>Paramètres</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex-row items-center space-x-3'>
              <Icon
                name='QuestionMarkCircleIcon'
                size={24}
                color={isDarkColorScheme ? 'white' : 'black'}
                solid={false}
              />
              <Text className='text-base'>Aide</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row items-center space-x-3'
              onPress={logout}
            >
              <Icon
                name='ArrowLeftOnRectangleIcon'
                size={24}
                color='red'
                solid={false}
              />
              <Text className='text-base text-red-500'>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};
