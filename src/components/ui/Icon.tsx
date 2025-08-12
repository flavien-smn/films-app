import * as HeroIconOutlines from 'react-native-heroicons/outline';
import * as HeroIconSolids from 'react-native-heroicons/solid';
import { useColorScheme } from '~/src/lib/useColorScheme';

interface IconProps {
  name: keyof typeof HeroIconSolids; // Nom de l'icône à utiliser, doit être une clé de `icons`
  color?: string; // Couleur de l'icône
  size?: number; // Taille de l'icône
  solid: boolean; // Savoir si l'icone est plein ou pas
}

const Icon: React.FC<IconProps> = ({ name, color, size, solid }) => {
  const { isDarkColorScheme } = useColorScheme();
  const HeroIcon = solid ? HeroIconSolids[name] : HeroIconOutlines[name];
  if (!HeroIcon) {
    console.error(`Icon "${name}" does not exist in the icon set.`);
    return null;
  }

  if (color) {
    return <HeroIcon color={color} size={size} />;
  }
  return <HeroIcon color={isDarkColorScheme ? 'white' : 'black'} size={size} />;
};

export default Icon;
