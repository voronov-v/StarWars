import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeScreen} from './screens/HomeScreen/HomeScreen';
import {PlanetsScreenFlat} from './screens/PlanetsScreen/index';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Planets: PlanetsScreenFlat,
});

const App = createAppContainer(TabNavigator);
export default App;
