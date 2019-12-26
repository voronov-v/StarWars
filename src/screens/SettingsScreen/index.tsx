import React from 'react';
import {View, Text, Picker} from "react-native";
//@ts-ignore
import i18n from '@root/i18n';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_LANGUAGE, themeType, TOGGLE_THEME} from "@root/redux/reducers/settingsReducer";
import {getIsDarkMode} from "@root/selectors";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CheckBox} from 'react-native-elements'
import {styles} from './styles'

export const SettingsScreen = () => {
  const {t} = useTranslation('settingsScreen');
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary, onBackground] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY, theme.ON_BACKGROUND];
  const lang: string = useSelector((state: any) => state.settings.language);

  const onLanguageChangePress = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch({type: CHANGE_LANGUAGE, payload: lang})
  };

  const onToggleTheme = () => dispatch({type: TOGGLE_THEME});

  const SettingsItem = ({iconName, settingsName, children}: any) => {
    return (
      <View style={{...styles.containerItem, borderBottomColor: onBackground}}>
        <View style={styles.containerIcon}>
          <Icon name={iconName} size={20} color={textColor}/>
          <Text style={{...styles.text, color: textColor}}>{t(settingsName)}</Text>
        </View>
        <View>
          {children}
        </View>
      </View>
    )
  };

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <SettingsItem iconName={'brightness-medium'} settingsName={'useDarkMode'}>
        <CheckBox checked={isDarkMode} onPress={onToggleTheme} containerStyle={{padding: 0}} checkedColor={primary}/>
      </SettingsItem>
      <SettingsItem iconName={'language'} settingsName={'changeLangTitle'}>
        <Picker selectedValue={lang} style={{width: 50, height: 50}} itemStyle={{height: 50, color: primary}}
                onValueChange={(itemValue) => onLanguageChangePress(itemValue)}>
          <Picker.Item label="ENG" value="en"/>
          <Picker.Item label="RUS" value="ru"/>
        </Picker>
      </SettingsItem>
    </View>
  )
};
