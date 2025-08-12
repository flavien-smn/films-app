import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from '~/src/components/ui/Icon';
import { useColorScheme } from '~/src/lib/useColorScheme';

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  onPress,
}) => {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <View className='flex flex-row items-center rounded-md bg-neutral-300 dark:bg-neutral-700 py-1 px-2'>
      <Icon
        name='MagnifyingGlassIcon'
        size={18}
        color={isDarkColorScheme ? 'white' : 'black'}
        solid={false}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className='flex-1 ml-2 dark:text-white'
        placeholderTextColor={isDarkColorScheme ? 'white' : 'black'}
      />
    </View>
  );
};

export default SearchBar;
