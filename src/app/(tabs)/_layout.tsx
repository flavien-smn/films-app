import { Redirect, Tabs } from 'expo-router';
import { Image, View } from 'react-native';
import Icon from '~/src/components/ui/Icon';
import * as icons from 'react-native-heroicons/solid';
import { useAuth } from '~/src/contexts/authContext';
import { Text } from '~/src/components/ui/text';

interface TabIconProps {
  icon: keyof typeof icons; // nom de l'icone
  name: string;
  color: string; // Couleur par défaut de l'icône
  focused: boolean; // Indique si l'onglet est sélectionné
}

const TabIcon = ({ icon, name, color, focused }: TabIconProps) => {
  return (
    <View
      className='flex items-center justify-center'
      style={{ gap: 4, minWidth: 60 }} // Largeur minimale pour tout aligner
    >
      <Icon name={icon} color={color} size={24} solid={focused} />
      <Text
        className='text-xs'
        style={{
          color,
          fontSize: 10,
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

interface HeaderProps {
  title: string;
  profilPicture: string | null;
}

const Header = ({ title, profilPicture }: HeaderProps) => {
  return (
    <View className='flex flex-row justify-start items-center px-5 py-4 box-border gap-x-7'>
      <View className='justify-self-start'>
        {profilPicture ? (
          <Image
            source={{ uri: profilPicture }}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />
        ) : (
          <Icon name={'UserIcon'} solid={false} size={34} />
        )}
      </View>
      <Text className='justify-self-center font-bold text-xl'>{title}</Text>
    </View>
  );
};

const TabsLayout = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Redirect href='/sign-in' />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          sceneStyle: {
            backgroundColor: 'transparent',
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60, // Plus standard
            paddingBottom: 8, // Petit padding pour "souffler"
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',

            header: () => (
              <Header
                title={'Découvrir'}
                profilPicture={currentUser?.photoURL}
              />
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={'HomeIcon'}
                name={'home'}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='search'
          options={{
            title: 'Search',
            header: () => (
              <Header
                title={'Rechercher'}
                profilPicture={currentUser?.photoURL}
              />
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='MagnifyingGlassIcon'
                name='search'
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='library'
          options={{
            title: 'Library',
            header: () => (
              <Header
                title={'Bibliothèque'}
                profilPicture={currentUser?.photoURL}
              />
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='RectangleStackIcon'
                name='library'
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
