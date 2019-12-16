import {createBottomTabNavigator} from "react-navigation-tabs";
import {HomeScreen} from "@root/screens/HomeScreen/HomeScreen";
import PlanetScreenNavigator from "./PlanetsScreenNavigator";
import {FilmsScreen} from "@root/screens/FilmsScreen";
// import Icon from 'react-native-vector-icons/AntDesign';
// import React from 'react';

export const BottomTabNavigatorTST = createBottomTabNavigator({
    Home: HomeScreen,
    Planets: {
      screen: PlanetScreenNavigator,
      navigationOptions: {
        title: 'Planets',
        // tabBarIcon: () => {
        //   return (
        //     {<Icon />}
        //   )
        // }
      }
    },
    Films: {
      screen: FilmsScreen,
      navigationOptions: {
        title: 'Films'
      }
    }
  }, {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 30,
      },
      style: {
        backgroundColor: 'black',
      },
    }
  }
);
