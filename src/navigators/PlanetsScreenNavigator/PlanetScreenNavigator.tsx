import { createStackNavigator } from 'react-navigation-stack';
import { PlanetInfoScreen } from '../../screens/PlanetInfoScreen';
import { PlanetsScreen } from '../../screens/PlanetsScreen';

export const PlanetScreenNavigator = createStackNavigator(
  {
    PlanetsList: PlanetsScreen,
    PlanetInfo: PlanetInfoScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: 'PlanetsList',
  },
);
