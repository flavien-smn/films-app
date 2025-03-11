import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '~/src/components/ui/text';
import Icon from '~/src/components/ui/Icon';
import { useColorScheme } from '~/src/lib/useColorScheme';
import { NAV_THEME } from '~/src/lib/constants';

interface FormFieldProps extends TextInputProps {
  label: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  placeholder,
  handleChangeText,
  otherStyles = '',
  textContentType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base pl-2 box-border'>{label}</Text>

      <View
        className={`w-full h-12 px-4 bg-black-100 rounded-lg border border-input ${
          isFocused ? 'border-ring' : 'border-input'
        } flex flex-row items-center`}
      >
        <TextInput
          className='flex-1 text-neutral-950 dark:text-neutral-100'
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={
            (textContentType === 'password' ||
              textContentType === 'newPassword') &&
            !showPassword
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
          textContentType={textContentType}
        />

        {(textContentType === 'password' ||
          textContentType === 'newPassword') && (
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            <Icon
              name={!showPassword ? 'EyeIcon' : 'EyeSlashIcon'}
              size={20}
              color={
                isDarkColorScheme ? NAV_THEME.dark.text : NAV_THEME.light.text
              }
              solid={false}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
