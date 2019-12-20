import {Button, Text, View} from "react-native";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {getIsDarkMode} from "@root/selectors";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";

export const ErrorView: FC<any> = ({errMsg, dispatch, reloadMsg}) => {
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ERROR, theme.ON_ERROR, theme.PRIMARY];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bgColor}}>
      <Text style={{color: textColor, fontSize: 18, fontWeight: 'bold'}}>Error: {errMsg}</Text>
      <Button color={primary} title={reloadMsg} onPress={dispatch}/>
    </View>
  )
};
