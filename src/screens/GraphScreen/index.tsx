import React, { FC, ReactElement } from 'react';
import { View, Text } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from '@root/selectors';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';

export const GraphScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement => {
  const { navigation } = props;
  console.log('navigation', navigation);
  // const dispatch = useDispatch();

  const isDarkMode = useSelector(getIsDarkMode);

  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  //@ts-ignore
  const [textColor, bgColor, primary, errColor] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY, theme.ERROR];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
      <Text style={{ color: textColor }}>Graph screen</Text>
    </View>
  );
};
