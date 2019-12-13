import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {PlanetsScreenFlat} from '../screens/PlanetsScreen/index'

export const BottomTabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Planets: PlanetsScreenFlat,
});
