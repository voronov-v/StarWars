import React from 'react' ;
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import PlanetScreenNavigator from './PlanetsScreenNavigator';
import {FilmsScreen} from "../screens/FilmsScreen";
import {colors} from "../consts/themes";
import Icon from 'react-native-vector-icons/AntDesign';
import {SettingsScreen} from "@root/screens/SettingsScreen";

export const BottomTabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: <Icon color={colors.pink} name={'home'} size={25}/>
      }
    },
    Planets: {
      screen: PlanetScreenNavigator,
      navigationOptions: {
        tabBarIcon:  <Icon color={colors.pink} name={'dribbble'} size={25} />,
        tabBarLabel: 'Planets'
      },
    },
    Films: {
      screen: FilmsScreen,
      navigationOptions: {
        title: 'Films',
        tabBarIcon: <Icon color={colors.pink} name={'eyeo'} size={25}/>
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: <Icon color={colors.pink} name={'setting'} size={25}/>
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: colors.pink,
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: colors.black,
        height: 53,
      },
    },
  },
);
