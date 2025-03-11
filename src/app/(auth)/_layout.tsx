import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '~/src/contexts/authContext';

const AuthLayout = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Redirect href='/home' />;
  }
  return (
    <>
      <Stack>
        <Stack.Screen name='sign-in' options={{ headerShown: false }} />
        <Stack.Screen name='sign-up' options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default AuthLayout;
