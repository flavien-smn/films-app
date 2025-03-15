import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Text } from '~/src/components/ui/text';
import useFetch from '~/src/hooks/useFetch';
import MovieCard from '~/src/components/home/movieCard';
import { fetchMovies } from '~/src/services/tmdb/api';
import RenderFilmList from '~/src/components/home/render-film-list';

const Home = () => {
  const {
    data: popularMovies,
    error: popularMoviesError,
    loading: popularMoviesLoading,
  } = useFetch(() => fetchMovies(''));
  return (
    <ScrollView className='px-4 '>
      <View className='flex flex-col gap-y-5'>
        <RenderFilmList
          error={popularMoviesError}
          data={popularMovies}
          renderItem={({ item }) => (
            <MovieCard movie={item} isLoading={popularMoviesLoading} />
          )}
          keyExtractor={item => item.id.toString()}
          itemSeparatorComponent={() => <View className='w-2' />}
        />
        <View>
          <Text className='text-l font-bold pl-2 pb-2'>Dernières sorties</Text>
          <FlatList
            data={popularMovies}
            renderItem={({ item }) => (
              <MovieCard movie={item} isLoading={popularMoviesLoading} />
            )}
            keyExtractor={item => item.id.toString()}
            horizontal
            ItemSeparatorComponent={() => <View className='w-2' />} // Equivalent de gap horizontal (ex: 1rem = 16px)
          />
        </View>
        <View>
          <Text className='text-l font-bold pl-2 pb-2'>Pour vous</Text>
          <FlatList
            data={popularMovies}
            renderItem={({ item }) => (
              <MovieCard movie={item} isLoading={popularMoviesLoading} />
            )}
            keyExtractor={item => item.id.toString()}
            horizontal
            ItemSeparatorComponent={() => <View className='w-2' />} // Equivalent de gap horizontal (ex: 1rem = 16px)
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
