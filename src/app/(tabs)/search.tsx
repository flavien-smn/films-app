import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import MovieCard from '~/src/components/home/movieCard';
import useFetch from '~/src/hooks/useFetch';
import { fetchMovies, QueryTypes } from '~/src/services/tmdb/api';
import SearchBar from '~/src/components/ui/search-bar';
import { Text } from '~/src/components/ui/text';
import { Skeleton } from '~/src/components/ui/skeleton';
import { useColorScheme } from '~/src/lib/useColorScheme';
import { NAV_THEME } from '~/src/lib/constants';

const Search = () => {
  const { isDarkColorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const {
    data: movies,
    error,
    loading: isLoading,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies(QueryTypes.search, searchQuery), false);

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
  //
  // useEffect(() => {
  //   // @ts-ignore
  //   if (movies?.length > 0 && movies?.[0]) {
  //     updateSearchCount(searchQuery, movies[0]);
  //   }
  // }, [movies]);

  const skeletonArray = Array.from({ length: 9 }); // Exemple de 9 skeletons pour un grid 3 colonnes
  return (
    <View>
      <FlatList
        data={isLoading ? skeletonArray : movies}
        renderItem={({ item, index }) =>
          isLoading ? (
            <Skeleton className='h-40 w-28' key={index} /> // Composant Skeleton qu'on va créer
          ) : (
            <MovieCard movie={item as Movie} />
          )
        }
        keyExtractor={(item, index) =>
          isLoading ? index.toString() : (item as Movie).id.toString()
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
            <View
              className='px-4 pb-4'
              style={{
                backgroundColor: isDarkColorScheme
                  ? NAV_THEME.dark.background
                  : NAV_THEME.light.background,
              }}
            >
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
                {searchQuery.trim() ? 'Aucun film trouvé' : ''}
              </Text>
            </View>
          ) : null
        }
        stickyHeaderIndices={[0]} // ✅ Rendre le header sticky
      />
    </View>
  );
};

export default Search;
