import React from 'react';
import { StatusBar, StatusBarStyle, View, ViewStyle, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from '@root/selectors';
import { PRIMARY_THEME, DARK_THEME } from '@root/consts/themes';
import { themeType } from '@root/redux/reducers/settingsReducer';

export const ThemeWrapper: React.FC = (props): React.ReactElement => {
  const { children } = props;

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const barStyle: StatusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
  const safeAreaViewStyle: ViewStyle = { flex: 1, backgroundColor: theme.default };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={barStyle} />
      <SafeAreaView style={{ flex: 1, ...safeAreaViewStyle }}>{children}</SafeAreaView>
    </View>
  );
};
