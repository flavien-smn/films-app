import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Skeleton } from '~/src/components/ui/skeleton';
import { Text } from '~/src/components/ui/text';
import useFetch from '~/src/hooks/useFetch';
import { fetchMovies } from '~/src/services/tmdb/api';
import MovieCard from '~/src/components/home/movieCard';

const Home = () => {
  const {
    data: popularMovies,
    error: popularMoviesError,
    loading: popularMoviesLoading,
  } = useFetch(() => fetchMovies({ query: '' }));
  const items = [
    { id: 1, text: 'Item 1', image: './item1.png' },
    { id: 2, text: 'Item 2', image: './item2.png' },
    { id: 3, text: 'Item 3', image: './item3.png' },
    { id: 4, text: 'Item 3', image: './item3.png' },
    {
      id: 5,
      text: 'Item 3 g',
      image: './item3.png',
    },
    // Add more items here...
  ];

  const renderItem = ({ item }: any) => <Skeleton className='h-40 w-28' />;

  return (
    <ScrollView className='px-4 '>
      <View className='flex flex-col gap-y-5'>
        <View>
          <Text className='text-l font-bold pl-2 pb-2'>
            Films les plus populaires
          </Text>
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
