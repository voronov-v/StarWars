import React from 'react';
import { useDispatch} from "react-redux";
import {View, Text, StyleSheet, Button} from 'react-native';
import {LOAD_PLANETS} from "../../redux/reducers/planetsReducer";
import {LOAD_FILMS} from "../../redux/reducers/filmsReducer";

export const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>home info</Text>
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
