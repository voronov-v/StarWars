// import React from 'react' ;
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import PlanetScreenNavigator from './PlanetsScreenNavigator';
// import Icon from 'react-native-vector-icons/AntDesign';

export const BottomTabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Planets: {
      screen: PlanetScreenNavigator,
      navigationOptions: {
        title: 'Planets',
        // tabBarIcon:  <Icon color={'black'} name={'okay'} size={25} />
        },
      }
    },
  {
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 30,
      },
      style: {
        backgroundColor: 'black',
      },
    },
  },
);
