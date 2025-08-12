import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '~/src/contexts/authContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NAV_THEME } from '~/src/lib/constants';
import { useColorScheme } from '~/src/lib/useColorScheme';

const AuthLayout = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Redirect href='/home' />;
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
          <Stack>
            <Stack.Screen name='sign-in' options={{ headerShown: false }} />
            <Stack.Screen name='sign-up' options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default AuthLayout;
