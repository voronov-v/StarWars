// import React from 'react' ;
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import PlanetScreenNavigator from './PlanetsScreenNavigator';
import {FilmsScreen} from "../screens/FilmsScreen";
import {colors} from "../consts/themes";
// import Icon from 'react-native-vector-icons/AntDesign';

export const BottomTabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Planets: {
      screen: PlanetScreenNavigator,
      navigationOptions: {
        title: 'Planets',
        // tabBarIcon:  <Icon color={'black'} name={'okay'} size={25} />
      },
    },
    Films: {
      screen: FilmsScreen,
      navigationOptions: {
        title: 'Films'
      }
    }
  },
  {
    tabBarOptions: {
      // showIcon: true
      activeTintColor: colors.pink,
      labelStyle: {
        fontSize: 30,
      },
      style: {
        backgroundColor: colors.black,
        height: 35,
      },
    },
  },
);
