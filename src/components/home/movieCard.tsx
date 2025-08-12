import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

interface RenderMovieProps {
  movie: Movie;
}

const MovieCard = ({ movie }: RenderMovieProps) => {
  return (
    <View className='h-40 w-28'>
      <Link href={`/movies/${movie.id}`} asChild>
        <TouchableOpacity>
          <Image
            source={{
              uri: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://placehold.co/112x160/png?text=No+image',
            }}
            className='h-full w-full rounded-lg'
            resizeMode='cover'
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default MovieCard;
