import { useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface UsePageTransitionOptions {
  delay?: number;        // Délai avant l'animation (défaut: 150ms)
  duration?: number;     // Durée de l'animation (défaut: 400ms)
  initialScale?: number; // Échelle initiale (défaut: 0.95)
}

export const usePageTransition = (options: UsePageTransitionOptions = {}) => {
  const {
    delay = 150,
    duration = 400,
    initialScale = 0.95
  } = options;

  const contentOpacity = useSharedValue(0);
  const contentScale = useSharedValue(initialScale);

  useEffect(() => {
    const timer = setTimeout(() => {
      contentOpacity.value = withTiming(1, { 
        duration,
        easing: Easing.out(Easing.cubic)
      });
      contentScale.value = withTiming(1, { 
        duration,
        easing: Easing.out(Easing.cubic)
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration, initialScale]);

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [
        {
          scale: contentScale.value,
        },
      ],
    };
  });

  return {
    contentAnimatedStyle,
    // Bonus : contrôler manuellement l'animation si besoin
    triggerAnimation: () => {
      contentOpacity.value = withTiming(1, { duration, easing: Easing.out(Easing.cubic) });
      contentScale.value = withTiming(1, { duration, easing: Easing.out(Easing.cubic) });
    }
  };
};
