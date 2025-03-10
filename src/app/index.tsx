import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/src/components/ui/button';
import { Text } from '~/src/components/ui/text';
import { Link } from 'expo-router';

export default function Screen() {
  return (
    <View className='flex-1 justify-end items-center gap-y-48 px-6 py-20 box-border'>
      <Text className='text-center text-xl font-bold'>
        Crée tes playlists de films, retrouve tes favoris et explore de
        nouvelles découvertes en un seul endroit.
      </Text>
      <View className='flex flex-col items-center w-full'>
        <Button
          className='w-full'
          variant='default'
          onPress={() => console.log('clicked')}
        >
          <Text>S'inscrire</Text>
        </Button>
        <Button
          className='w-full'
          variant='link'
          onPress={() => console.log('clicked')}
        >
          <Text>Se connecter</Text>
        </Button>
        <Link href='/home'>Go to home</Link>
      </View>
    </View>
  );
}
