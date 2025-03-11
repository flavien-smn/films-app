import React from 'react';
import { ScrollView, View } from 'react-native';
import { useAuth } from '~/src/contexts/authContext';
import { Button } from '~/src/components/ui/button';
import { Text } from '~/src/components/ui/text';
import { router } from 'expo-router';

const Home = () => {
  const { currentUser, logout } = useAuth();
  return (
    <ScrollView>
      <View className='px-5'>
        <Text> {currentUser?.email} </Text>
        <Button
          onPress={() => {
            logout().then(() => router.push('/'));
          }}
        >
          <Text>deconnexion</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Home;
