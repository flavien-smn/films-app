import * as icons from 'react-native-heroicons/solid';
import { View } from 'react-native';
import Icon from '~/src/components/ui/Icon';
import { Text } from '~/src/components/ui/text';

interface TabIconProps {
  icon: keyof typeof icons; // nom de l'icone
  name: string;
  color: string; // Couleur par défaut de l'icône
  focused: boolean; // Indique si l'onglet est sélectionné
}

export const TabIcon = ({ icon, name, color, focused }: TabIconProps) => {
  return (
    <View
      className='flex items-center justify-center'
      style={{ gap: 4, minWidth: 60 }} // Largeur minimale pour tout aligner
    >
      <Icon name={icon} color={color} size={24} solid={focused} />
      <Text
        className='text-xs'
        style={{
          color,
          fontSize: 10,
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};
