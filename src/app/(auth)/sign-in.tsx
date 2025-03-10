import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '~/src/components/ui/text';
import FormField from '~/src/components/ui/formfield';
import { Button } from '~/src/components/ui/button';
import { Link } from 'expo-router';

const SignIn = () => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const onChangeEmail = (text: string) => {
    setEmailValue(text);
  };

  const onChangePassword = (text: string) => {
    setPasswordValue(text);
  };
  return (
    <ScrollView>
      <View className='w-full h-full flex items-center justify-start px-4 gap-y-48 py-16 box-border'>
        <Text className='text-3xl font-bold'>Se connecter</Text>
        <View className='w-full flex flex-col gap-y-8'>
          <View className='w-full flex flex-col gap-y-4'>
            <FormField
              label='Email'
              value={emailValue}
              onChangeText={onChangeEmail}
              aria-errormessage='email-error'
              handleChangeText={text => onChangeEmail(text)}
              placeholder={'fezfe'}
            />
            <FormField
              label='Password'
              value={passwordValue}
              onChangeText={onChangePassword}
              aria-errormessage='email-error'
              handleChangeText={text => onChangePassword(text)}
              placeholder={'fezfe'}
            />
          </View>

          <Button>
            <Text>Connexion</Text>
          </Button>
          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Vous n'avez pas de compte ?
            </Text>
            <Link
              href='/sign-up'
              className='text-lg font-psemibold text-primary'
            >
              S'inscrire
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
