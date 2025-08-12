import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '~/src/contexts/authContext';
import { Header } from '~/src/components/tabs/header';
import { TabIcon } from '~/src/components/tabs/icon';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NAV_THEME } from '~/src/lib/constants';
import { useColorScheme } from '~/src/lib/useColorScheme';

const TabsLayout = () => {
  const { isDarkColorScheme } = useColorScheme();

  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Redirect href='/sign-in' />;
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDarkColorScheme
              ? NAV_THEME.dark.background
              : NAV_THEME.light.background,
          }}
        >
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
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default TabsLayout;
