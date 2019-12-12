import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {PlanetsScreen} from './screens/PlanetsScreen/PlanetsScreen'
import {HomeScreen} from './screens/HomeScreen/HomeScreen'

const TabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Planets: PlanetsScreen
});

const App = createAppContainer(TabNavigator);
export default App