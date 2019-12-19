import React from 'react';
import {useDispatch} from "react-redux";
import {View, Text, StyleSheet, Button} from 'react-native';
import {LOAD_PLANETS} from "../../redux/reducers/planetsReducer";
import {LOAD_FILMS} from "../../redux/reducers/filmsReducer";
import { useTranslation } from 'react-i18next';

export const HomeScreen = () => {
  const {t} = useTranslation('homeScreen');
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('helloTitle')}</Text>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={styles.text}>{t('loadTitle')}</Text>
        <View style={{flexDirection: 'row', width: 400, justifyContent: 'space-between'}}>
          <Button title={t('btnLoadPlanets')} onPress={() => dispatch({type: LOAD_PLANETS})}/>
          <Button title={t('btnLoadFilms')} onPress={() => dispatch({type: LOAD_FILMS})}/>
        </View>
      </View>
    </View>
  );
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
