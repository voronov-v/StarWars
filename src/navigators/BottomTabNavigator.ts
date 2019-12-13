import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import PlanetScreenNavigator from "./PlanetsScreenNavigator";

export const BottomTabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Planets: PlanetScreenNavigator,
});
