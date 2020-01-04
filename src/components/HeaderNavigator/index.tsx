import React from 'react';
import {View} from 'react-native';
import {DrawerTrigger} from '../DrawerTrigger'
import {useSelector} from "react-redux";
import {getIsDarkMode} from "@root/selectors";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";

export const HeaderNavigator = () => {
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const bgColor = isDarkMode ? DARK_THEME.BACKGROUND : PRIMARY_THEME.BACKGROUND;

  return (
    <View style={{backgroundColor: bgColor}}>
      <DrawerTrigger/>
    </View>
  )
};
