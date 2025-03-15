import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import MovieCard from '~/src/components/home/movieCard';
import useFetch from '~/src/hooks/useFetch';
import { fetchMovies } from '~/src/services/tmdb/api';
import SearchBar from '~/src/components/ui/search-bar';
import { Text } from '~/src/components/ui/text';
import { Skeleton } from '~/src/components/ui/skeleton';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const {
    data: movies,
    error,
    loading: isLoading,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies(searchQuery), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const skeletonArray = Array.from({ length: 9 }); // Exemple de 9 skeletons pour un grid 3 colonnes
  return (
    <View>
      <FlatList
        data={isLoading ? skeletonArray : movies}
        renderItem={({ item, index }) =>
          isLoading ? (
            <Skeleton className='h-40 w-28' key={index} /> // Composant Skeleton qu'on va créer
          ) : (
            <MovieCard movie={item} />
          )
        }
        keyExtractor={(item, index) =>
          isLoading ? index.toString() : item.id.toString()
        }
        className='px-4'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='px-4'>
              <SearchBar
                placeholder={'Rechercher un film...'}
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {error && (
              <Text className='text-destructive'>
                Impossible de remonter les films : {error.message}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <View className='p-4'>
              <Text className='text-center'>
                {searchQuery.trim()
                  ? 'Aucun film trouvé'
                  : 'Rechercher un film'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
