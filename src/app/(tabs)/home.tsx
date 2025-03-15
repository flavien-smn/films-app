import React from 'react';
import { ScrollView, View } from 'react-native';
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
          title={'Films populaires'}
          error={popularMoviesError}
          data={popularMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={item => item.id.toString()}
          itemSeparatorComponent={() => <View className='w-2' />}
          loading={true}
        />
        <RenderFilmList
          title={'Dernières sorties'}
          error={popularMoviesError}
          data={popularMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={item => item.id.toString()}
          itemSeparatorComponent={() => <View className='w-2' />}
          loading={true}
        />
        <RenderFilmList
          title={'Pour vous'}
          error={popularMoviesError}
          data={popularMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={item => item.id.toString()}
          itemSeparatorComponent={() => <View className='w-2' />}
          loading={popularMoviesLoading}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
