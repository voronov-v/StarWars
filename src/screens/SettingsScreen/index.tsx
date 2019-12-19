import React from 'react';
import {View, Text, Button, StyleSheet} from "react-native";
//@ts-ignore
import i18n from '@root/i18n';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {CHANGE_LANGUAGE} from "@root/redux/reducers/settingsReducer";

export const SettingsScreen = () => {
  const {t} = useTranslation('homeScreen');
  const dispatch = useDispatch();

  const onLanguageChangePress = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch({type: CHANGE_LANGUAGE, payload: lang})
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={styles.text}>{t('changeLangTitle')}</Text>
        <View style={{flexDirection: 'row', width: 400, justifyContent: 'space-around'}}>
          <Button title='ENG' onPress={() => onLanguageChangePress('en')}/>
          <Button title='RU' onPress={() => onLanguageChangePress('ru')}/>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#e91e63',
    fontSize: 24,
  },
});

