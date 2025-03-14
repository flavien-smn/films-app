import { Skeleton } from '~/src/components/ui/skeleton';
import React from 'react';
import { Image, View } from 'react-native';

interface RenderMovieProps {
  movie: Movie;
  isLoading: boolean;
}

const MovieCard = ({ movie, isLoading }: RenderMovieProps) => {
  if (isLoading) {
    return <Skeleton className='h-40 w-28' />;
  }
  return (
    <View className='h-40 w-28'>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        className='h-full w-full rounded-lg'
        resizeMode='cover'
      />
    </View>
  );
};

export default MovieCard;
