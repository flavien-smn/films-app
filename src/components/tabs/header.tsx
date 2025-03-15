import { Image, TouchableOpacity, View } from 'react-native';
import Icon from '~/src/components/ui/Icon';
import { Text } from '~/src/components/ui/text';
import { useDrawer } from '~/src/contexts/drawerContext';

interface HeaderProps {
  title: string;
  profilPicture: string | null;
}

export const Header = ({ title, profilPicture }: HeaderProps) => {
  const { openDrawer } = useDrawer();
  return (
    <View className='flex flex-row justify-start items-center px-5 py-6 box-border gap-x-7'>
      <View>
        <TouchableOpacity onPress={() => openDrawer()}>
          {profilPicture ? (
            <Image
              source={{ uri: profilPicture }}
              resizeMode='contain'
              className='w-[115px] h-[34px]'
            />
          ) : (
            <Icon name={'UserIcon'} solid={false} size={34} />
          )}
        </TouchableOpacity>
      </View>
      <Text className='font-bold text-2xl'>{title}</Text>
    </View>
  );
};
