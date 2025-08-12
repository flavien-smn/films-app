import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '~/src/components/ui/button';
import { Text } from '~/src/components/ui/text';
import { Link, Redirect, router } from 'expo-router';
import { useAuth } from '~/src/contexts/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Redirect href='/home' />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className='flex-1 justify-end items-center gap-y-48 px-6 py-20 box-border'>
          <Text className='text-center text-xl font-bold'>
            Crée tes playlists de films, retrouve tes favoris et explore de
            nouvelles découvertes en un seul endroit.
          </Text>
          <View className='flex flex-col items-center w-full'>
            <Button
              className='w-full'
              variant='default'
              onPress={() => router.push('/sign-up')}
            >
              <Text>S'inscrire</Text>
            </Button>
            <Button
              className='w-full'
              variant='link'
              onPress={() => router.push('/sign-in')}
            >
              <Text>Se connecter</Text>
            </Button>
            <Link href='/home'>
              <Text>Go to home</Text>{' '}
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
