import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '~/src/components/ui/text';
import FormField from '~/src/components/ui/formfield';

const SignIn = () => {
  const [value, setValue] = React.useState('');

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <ScrollView>
      <View className='w-full min-h-[85vh] flex items-center justify-center px-4 my-6 gap-y-4'>
        <Text>Connexion</Text>
        <FormField
          label='Email'
          value={value}
          onChangeText={onChangeText}
          aria-errormessage='email-error'
          handleChangeText={text => onChangeText(text)}
          placeholder={'fezfe'}
        />
        <FormField
          label='Password'
          value={value}
          onChangeText={onChangeText}
          aria-errormessage='email-error'
          handleChangeText={text => onChangeText(text)}
          placeholder={'fezfe'}
        />
      </View>
    </ScrollView>
  );
};

export default SignIn;
