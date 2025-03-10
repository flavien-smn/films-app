import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import Icon from '~/src/lib/icons/Icon';
import * as icons from 'react-native-heroicons/solid';

interface TabIconProps {
  icon: keyof typeof icons; // nom de l'icone
  name: string;
  color: string; // Couleur par défaut de l'icône
  focused: boolean; // Indique si l'onglet est sélectionné
}

const TabIcon = ({ icon, name, color, focused }: TabIconProps) => {
  return (
    <View className='flex items-center justify-center '>
      <Icon name={icon} color={color} size={25} solid={focused} />
      <Text className='text-xs' style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          sceneStyle: {
            backgroundColor: 'transparent',
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
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
            headerShown: false,
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
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='RectangleStackIcon'
                name='lib'
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
