import { Image, Pressable, View } from 'react-native';
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
    <View className='flex flex-row justify-start items-center px-5 py-4 box-border gap-x-7'>
      <View className=''>
        <Pressable onPress={openDrawer}>
          {profilPicture ? (
            <Image
              source={{ uri: profilPicture }}
              resizeMode='contain'
              className='w-[115px] h-[34px]'
            />
          ) : (
            <Icon name={'UserIcon'} solid={false} size={34} />
          )}
        </Pressable>
      </View>
      <Text className='font-bold text-xl'>{title}</Text>
    </View>
  );
};
