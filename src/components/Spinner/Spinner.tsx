import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {DARK_THEME, PRIMARY_THEME} from '../../consts/themes'
import {useSelector} from "react-redux";
import {getIsDarkMode} from "@root/selectors";
import {themeType} from "@root/redux/reducers/settingsReducer";

export const Spinner = () => {
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [bgColor, primary] = [theme.BACKGROUND, theme.PRIMARY];

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor}}>
      <ActivityIndicator color={primary} size={'large'}/>
    </View>
  )
};

