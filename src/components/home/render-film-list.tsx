import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '~/src/components/ui/text';
import { Skeleton } from '~/src/components/ui/skeleton';

interface RenderFilmListProps {
  title: string;
  error: any;
  data: any[] | null;
  renderItem: ({ item }: { item: any }) => JSX.Element;
  keyExtractor: (item: any, index: number) => string;
  itemSeparatorComponent?: () => JSX.Element;
  loading: boolean;
}

const RenderFilmList: React.FC<RenderFilmListProps> = ({
  title,
  error,
  data,
  renderItem,
  keyExtractor,
  itemSeparatorComponent,
  loading,
}) => {
  const skeletonArray = Array.from({ length: 4 }); // Ajuste le nombre si besoin

  return (
    <View>
      <Text className='text-lg font-bold pl-2 pb-2'>{title}</Text>
      {error && (
        <Text className='text-destructive pl-2 pb-2'>
          Impossible de charger les films : {error.message}
        </Text>
      )}
      <FlatList
        data={loading ? skeletonArray : data}
        renderItem={({ item, index }) =>
          loading ? (
            <Skeleton className='h-40 w-28' key={index} />
          ) : (
            renderItem({ item })
          )
        }
        keyExtractor={(item, index) =>
          loading ? index.toString() : keyExtractor(item, index)
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparatorComponent}
      />
    </View>
  );
};

export default RenderFilmList;
