import React from 'react';
import {useDispatch} from "react-redux";
import {View, Text, StyleSheet, Button} from 'react-native';
import {LOAD_PLANETS} from "../../redux/reducers/planetsReducer";
import {LOAD_FILMS} from "../../redux/reducers/filmsReducer";
import { useTranslation } from 'react-i18next';

export const HomeScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('Home hello')}</Text>
      <Button title={'load planets'} onPress={() => dispatch({type: LOAD_PLANETS})}/>
      <Button title={'load films'} onPress={() => dispatch({type: LOAD_FILMS})}/>
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
