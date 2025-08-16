import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import { Button } from '~/src/components/ui/button';
import Icon from '~/src/components/ui/Icon';
import { Loading } from '~/src/components/ui/loading';
import { Text } from '~/src/components/ui/text';
import useFetch from '~/src/hooks/useFetch';
import { usePageTransition } from '~/src/hooks/usePageTransition';
import { NAV_THEME } from '~/src/lib/constants';
import { useColorScheme } from '~/src/lib/useColorScheme';
import { fetchMovieDetails } from '~/src/services/tmdb/api';

const { width } = Dimensions.get('window');
const REAL_IMAGE_HEIGHT = width / 1.778;
const IMAGE_HEIGHT = 300;
const HEADER_HEIGHT = 100;

const MovieDetails = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });


  const { contentAnimatedStyle } = usePageTransition({
    delay: 150,       
    duration: 400,     
    initialScale: 0.95 
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-IMAGE_HEIGHT, 0, REAL_IMAGE_HEIGHT],
            [-IMAGE_HEIGHT, 0, -REAL_IMAGE_HEIGHT+IMAGE_HEIGHT],
            'clamp'
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT * 0.2, REAL_IMAGE_HEIGHT],
            [3, 1.2, 1, 1],
            'clamp'
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0,IMAGE_HEIGHT/2 , IMAGE_HEIGHT- HEADER_HEIGHT],
        [0,0.2,1],
      ),
    };
  });

  if (loading) {
    return <Loading/>;
  }

  return (
    <View className='flex-1'>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerLeft: () => (
            <Button
              onPress={() => {}}
              variant={'ghost'}
              size={'icon'}
              className='ml-2 bg-black/50 rounded-full flex items-center justify-center'
            >
              <Icon name={'ChevronLeftIcon'} color={'white'} solid={true} />
            </Button>
          ),
          headerBackground: () => (
            <Animated.View
              style={[{
                backgroundColor: isDarkColorScheme
                  ? NAV_THEME.dark.background
                  : NAV_THEME.light.background,
                height: HEADER_HEIGHT
              }, headerAnimatedStyle]}
            />
          ),
        }}
      />
      
      {/* Wrapper avec animation de fondu */}
      <Animated.View style={contentAnimatedStyle} className='flex-1'>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <View>
            <Animated.Image
              source={{
                uri: movie?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : 'https://placehold.co/600x400/png?text=No+image',
              }}
              style={[
                {
                  height: IMAGE_HEIGHT,
                },
                imageAnimatedStyle,
              ]}
              resizeMode="cover"
            />
            <Text className='absolute bottom-5 left-5 text-white text-2xl font-bold'>{movie?.title}</Text>
            {/* Ajout du dégradé */}
            <LinearGradient
              colors={isDarkColorScheme ? [
                'transparent',
                'rgba(9, 9, 11, 0.05)',
                'rgba(9, 9, 11, 0.1)',
                'rgba(9, 9, 11, 0.4)',
                'rgba(9, 9, 11, 0.8)',
                'rgb(9, 9, 11)',
              ] : [
                'transparent',
                'rgba(255, 255, 255, 0.5)',
                'rgba(255, 255, 255, 0.8)',
                'rgb(255, 255, 255)',
              ]}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 30,
                zIndex: 1,
              }}
            />
          </View>
          <View
            style={{
              height: 2000,
              backgroundColor: isDarkColorScheme
                ? NAV_THEME.dark.background
                : NAV_THEME.light.background,
            }}
          >
            <Text>Movie Details</Text>
          </View>
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};

export default MovieDetails;
