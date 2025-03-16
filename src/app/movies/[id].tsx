import { Image, ScrollView, View } from 'react-native';
import { Text } from '~/src/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import useFetch from '~/src/hooks/useFetch';
import { fetchMovieDetails } from '~/src/services/tmdb/api';

export const options = {
  headerShown: false,
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));
  return (
    <View className='flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: movie?.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : 'https://placehold.co/600x400/png?text=No+image',
            }}
            className='w-full'
            style={{
              aspectRatio: 16 / 9, // Pour un format bandeau responsive
            }}
            resizeMode='cover'
          />
        </View>
        <Text>Movie Details</Text>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
