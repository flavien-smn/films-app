import { Image, ScrollView, View } from 'react-native';
import { Text } from '~/src/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import useFetch from '~/src/hooks/useFetch';
import { fetchMovieDetails } from '~/src/services/tmdb/api';

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
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className='w-full h-40'
            resizeMode='cover'
          />
        </View>
      </ScrollView>
      <Text>Movie Details</Text>
    </View>
  );
};

export default MovieDetails;
