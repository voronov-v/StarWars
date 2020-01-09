import { createStackNavigator } from 'react-navigation-stack';
import { FilmsScreen } from '@root/screens/FilmsScreen';
import { FilmInfoScreen } from '@root/screens/FilmInfoScreen';

export const FilmsScreenNavigator = createStackNavigator(
  {
    FilmsList: {
      screen: FilmsScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Info: {
      screen: FilmInfoScreen,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: 'FilmsList',
  },
);
