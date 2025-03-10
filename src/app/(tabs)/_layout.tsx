import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import Icon from '~/src/components/ui/Icon';
import * as icons from 'react-native-heroicons/solid';

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
