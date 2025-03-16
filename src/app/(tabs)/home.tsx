import React from 'react';
import { ScrollView, View } from 'react-native';
import useFetch from '~/src/hooks/useFetch';
import MovieCard from '~/src/components/home/movieCard';
import { fetchMovies, QueryTypes } from '~/src/services/tmdb/api';
import RenderFilmList from '~/src/components/home/render-film-list';

const Home = () => {
  const {
    data: popularMovies,
    error: popularMoviesError,
    loading: popularMoviesLoading,
  } = useFetch(() => fetchMovies(QueryTypes.popular, ''));

  const {
    data: trendingMovies,
    error: trendingMoviesError,
    loading: trendingMoviesLoading,
  } = useFetch(() => fetchMovies(QueryTypes.trending, ''));

  const {
    data: nowPlayingMovies,
    error: nowPlayingMoviesError,
    loading: nowPlayingMoviesLoading,
  } = useFetch(() => fetchMovies(QueryTypes.now_playing, ''));
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
          loading={popularMoviesLoading}
        />
        <RenderFilmList
          title={'En ce moment au cinéma'}
          error={nowPlayingMoviesError}
          data={nowPlayingMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={item => item.id.toString()}
          itemSeparatorComponent={() => <View className='w-2' />}
          loading={nowPlayingMoviesLoading}
        />
        <RenderFilmList
          title={'Tendances cette semaine'}
          error={trendingMoviesError}
          data={trendingMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={item => item.id.toString()}
          itemSeparatorComponent={() => <View className='w-2' />}
          loading={trendingMoviesLoading}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
