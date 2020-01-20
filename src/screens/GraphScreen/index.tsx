// import React, { Component, FC, ReactElement } from 'react';
// import { View, Text, StyleSheet, Animated } from "react-native";
// import { NavigationStackScreenProps } from "react-navigation-stack";
// import { useSelector } from "react-redux";
// import { getIsDarkMode } from "@root/selectors";
// import { themeType } from "@root/redux/reducers/settingsReducer";
// import { DARK_THEME, PRIMARY_THEME } from "@root/consts/themes";
//
// export const GraphScreen2: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement => {
//   const { navigation } = props;
//   console.log('navigation', navigation);
//   // const dispatch = useDispatch();
//
//   const isDarkMode = useSelector(getIsDarkMode);
//
//   const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
//   //@ts-ignore
//   const [textColor, bgColor, primary, errColor] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY, theme.ERROR];
//
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
//       <Text style={{ color: textColor }}>Graph screen</Text>
//     </View>
//   )
// };

import React, { FC, ReactElement, useState } from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity, TextInput } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { getIsDarkMode } from '@root/selectors';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';

export const GraphScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement => {
  const { navigation } = props;

  const [isGraphFaded, setIsGraphFaded] = useState(1);
  const [converterFade, setConverterFade] = useState(new Animated.Value(isGraphFaded));
  const [graphFade, setGraphFade] = useState(new Animated.Value(+!isGraphFaded));
  const isDarkMode = useSelector(getIsDarkMode);

  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  //@ts-ignore
  const [textColor, bgColor, primary, errColor] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY, theme.ERROR];
  console.log('navigation', navigation);

  const _start = () => {
    if (isGraphFaded === 0) {
      console.log('animated');
      Animated.timing(converterFade, { toValue: 1, duration: 3000 }).start();
      setGraphFade(new Animated.Value(0));
    } else {
      Animated.timing(graphFade, { toValue: 1, duration: 3000 }).start();
      setConverterFade(new Animated.Value(0));
    }
    setIsGraphFaded(+!isGraphFaded);
  };

  console.log('isGraphFaded', isGraphFaded);
  console.log('converterFade', converterFade._value);
  console.log('graphFade', graphFade._value);

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      <TouchableOpacity style={styles.btn} onPress={() => _start()}>
        <Text style={{ fontSize: 18, color: textColor, textAlign: 'center' }}>toggle</Text>
      </TouchableOpacity>

      <View style={styles.boxContainer}>
        {isGraphFaded === 1 ? (
          <Animated.View style={{ ...styles.box, opacity: converterFade, backgroundColor: '#347a2a' }}>
            <Text>conveter</Text>
            <TextInput style={{width: 100, height: 40, backgroundColor: 'white'}}/>
          </Animated.View>
        ) : (
          <Animated.View style={{ ...styles.box, opacity: graphFade, backgroundColor: '#ff6800' }}>
            <Text>graph</Text>
            <TextInput style={{width: 100, height: 40, backgroundColor: 'white'}}/>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#480032',
    width: 100,
    height: 40,
    padding: 3,
    justifyContent: 'center',
    borderRadius: 6,
  },
  boxContainer: {
    position: 'relative',
    width: '90%',
    alignItems: 'center',
  },
  box: {
    height: 250,
    width: 200,
    margin: 5,
    borderRadius: 12,
    justifyContent: 'center',
  },
});
