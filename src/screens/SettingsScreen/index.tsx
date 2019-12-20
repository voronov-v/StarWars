import React from 'react';
import {View, Text, Button, StyleSheet} from "react-native";
//@ts-ignore
import i18n from '@root/i18n';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_LANGUAGE, themeType, TOGGLE_THEME} from "@root/redux/reducers/settingsReducer";
import {getIsDarkMode} from "@root/selectors";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";

export const SettingsScreen = () => {
  const {t} = useTranslation('settingsScreen');
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  const onLanguageChangePress = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch({type: CHANGE_LANGUAGE, payload: lang})
  };

  const onToggleTheme = () => dispatch({type: TOGGLE_THEME});

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{...styles.text, color: textColor}}>{t('changeLangTitle')}</Text>
        <View style={styles.containerLang}>
          <Button color={primary} title='ENG' onPress={() => onLanguageChangePress('en')}/>
          <Button color={primary} title='RU' onPress={() => onLanguageChangePress('ru')}/>
        </View>
        <View>
          <Text style={{...styles.text, color: textColor}}>{t('useDarkMode')}</Text>
          <Button color={primary} title='Dark Mode 🌚' onPress={onToggleTheme}/>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLang: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 24,
  },
});

