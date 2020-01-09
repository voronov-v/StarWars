import { ViewStyle } from 'react-native';

export type ButtonProps = {
  wrapperStyle: ViewStyle;
  bgStyle: ViewStyle;
  onPress: () => void;
  children: JSX.Element;
};
