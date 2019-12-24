import {createStackNavigator} from "react-navigation-stack";
import {FilmsScreen} from "@root/screens/FilmsScreen";
import {InfoScreen} from "@root/screens/InfoScreen";

export const FilmsScreenNavigator = createStackNavigator(
  {
    FilmsList: {
      screen: FilmsScreen,
      navigationOptions: () => ({
        header: null
      }),
    },
    Info: {
      screen: InfoScreen,
    },
  }, {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: 'FilmsList'
  }
);
