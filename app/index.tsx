import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
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
          onPress={updateProgressValue}
        >
          <Text>S'inscrire</Text>
        </Button>
        <Button className='w-full' variant='link' onPress={updateProgressValue}>
          <Text>Se connecter</Text>
        </Button>
      </View>
    </View>
  );
}
