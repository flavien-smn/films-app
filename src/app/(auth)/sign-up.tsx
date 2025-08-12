import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '~/src/components/ui/text';
import FormField from '~/src/components/ui/formfield';
import { Button } from '~/src/components/ui/button';
import { Link, router } from 'expo-router';
import { useAuth } from '~/src/contexts/authContext';

const SignUp = () => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState('');
  const { register } = useAuth();

  const onChangeEmail = (text: string) => {
    setEmailValue(text);
  };

  const onChangePassword = (text: string) => {
    setPasswordValue(text);
  };

  const handleSignUp = () => {
    register(emailValue, passwordValue)
      .then(() => router.replace('/home'))
      .catch(error => console.error('erreur inscription : ', error));
  };

  return (
    <ScrollView>
      <View className='w-full h-full flex items-center justify-start px-4 gap-y-48 py-16 box-border'>
        <Text className='text-3xl font-bold'>S'inscrire</Text>
        <View className='w-full flex flex-col gap-y-8'>
          <View className='w-full flex flex-col gap-y-4'>
            <FormField
              label='Email'
              value={emailValue}
              onChangeText={onChangeEmail}
              aria-errormessage='email-error'
              handleChangeText={text => onChangeEmail(text)}
              placeholder={'fezfe'}
              autoComplete={'email'}
            />
            <FormField
              label='Mot de passe'
              value={passwordValue}
              onChangeText={onChangePassword}
              aria-errormessage='password-error'
              handleChangeText={text => onChangePassword(text)}
              placeholder={'fezfe'}
              textContentType={'newPassword'}
              autoComplete={'new-password'}
            />
            <FormField
              label='Confimer le mot de passe'
              value={confirmPasswordValue}
              onChangeText={setConfirmPasswordValue}
              aria-errormessage='password-error'
              handleChangeText={text => setConfirmPasswordValue(text)}
              placeholder={'fezfe'}
              textContentType={'password'}
              autoComplete={'password'}
            />
          </View>

          <Button onPress={() => handleSignUp()}>
            <Text>Inscription</Text>
          </Button>
          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg'>Vous avez déjà un compte ?</Text>
            <Link href='/sign-in' className='text-lg text-primary'>
              Se connecter
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
