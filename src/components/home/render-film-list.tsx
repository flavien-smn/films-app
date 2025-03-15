import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '~/src/components/ui/text';

function RenderFilmList(props: {
  error: Error | null;
  data: any[] | null;
  renderItem: ({ item }: { item: any }) => React.JSX.Element;
  keyExtractor: (item: any) => string;
  itemSeparatorComponent: () => React.JSX.Element;
}) {
  return (
    <View>
      <Text className='text-l font-bold pl-2 pb-2'>
        Films les plus populaires
      </Text>
      {props.error ? (
        <View> Impossible de remonter les films</View>
      ) : (
        <FlatList
          data={props.data}
          renderItem={props.renderItem}
          keyExtractor={props.keyExtractor}
          horizontal
          ItemSeparatorComponent={props.itemSeparatorComponent} // Equivalent de gap horizontal (ex: 1rem = 16px)
        />
      )}
    </View>
  );
}

export default RenderFilmList;
