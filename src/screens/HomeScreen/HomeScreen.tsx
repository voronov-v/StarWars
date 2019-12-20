import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, Text, StyleSheet, Button} from 'react-native';
import {LOAD_PLANETS} from "../../redux/reducers/planetsReducer";
import {LOAD_FILMS} from "../../redux/reducers/filmsReducer";
import {useTranslation} from 'react-i18next';
import {getIsDarkMode} from "@root/selectors";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";

export const HomeScreen = () => {
  const {t} = useTranslation('homeScreen');
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <Text style={{...styles.text, color: textColor}}>{t('helloTitle')}</Text>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{...styles.text, color: textColor}}>{t('loadTitle')}</Text>
        <View style={{flexDirection: 'row', width: 350, justifyContent: 'space-between'}}>
          <Button color={primary} title={t('btnLoadPlanets')} onPress={() => dispatch({type: LOAD_PLANETS})}/>
          <Button color={primary} title={t('btnLoadFilms')} onPress={() => dispatch({type: LOAD_FILMS, payload: []})}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center',},
  text: {fontSize: 24,},
});
