import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '~/src/contexts/authContext';
import { DrawerProvider } from '~/src/contexts/drawerContext';
import { Header } from '~/src/components/tabs/header';
import { TabIcon } from '~/src/components/tabs/icon';
import { Drawer } from '~/src/components/ui/drawer';

const TabsLayout = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Redirect href='/sign-in' />;
  }

  return (
    <>
      <DrawerProvider>
        <Drawer />
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
      </DrawerProvider>
    </>
  );
};

export default TabsLayout;
