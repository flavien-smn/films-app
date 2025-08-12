import { ActivityIndicator, View, ViewProps } from 'react-native';
import { cn } from '~/src/lib/utils';

interface LoadingProps extends ViewProps {
  size?: number | 'small' | 'large';
  color?: string;
}

export function Loading({ 
  size = 'large',
  color,
  className,
  ...props 
}: LoadingProps) {
  return (
    <View 
      className={cn("flex-1 items-center justify-center", className)} 
      {...props}
    >
      <ActivityIndicator 
        size={size} 
        color={color} 
      />
    </View>
  );
}