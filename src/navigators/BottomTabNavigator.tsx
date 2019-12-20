import React from 'react' ;
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import PlanetScreenNavigator from './PlanetsScreenNavigator';
import {FilmsScreen} from "../screens/FilmsScreen";
import {colors, DARK_THEME, PRIMARY_THEME} from "../consts/themes";
import Icon from 'react-native-vector-icons/AntDesign';
import {SettingsScreen} from "@root/screens/SettingsScreen";
import {useSelector} from "react-redux";
import {getIsDarkMode} from "@root/selectors";
import {themeType} from "@root/redux/reducers/settingsReducer";

const TabBarComponent = (props:any) => {
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [bgColor, inactiveTintColor] = [theme.default, theme.PRIMARY];
const newProps = {...props, inactiveTintColor: inactiveTintColor};
  return <BottomTabBar {...newProps} style={{backgroundColor: bgColor}}/>;
};

export const BottomTabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: (props) => {
          const { tintColor } = props;
          return <Icon color={tintColor} name={'home'} size={25}/>
        },
      }
    },
    Planets: {
      screen: PlanetScreenNavigator,
      navigationOptions: {
        tabBarIcon: (props) => {
          const { tintColor } = props;
          return <Icon color={tintColor} name={'dribbble'} size={25}/>
        },
        tabBarLabel: 'Planets'
      },
    },
    Films: {
      screen: FilmsScreen,
      navigationOptions: {
        title: 'Films',
        tabBarIcon: (props) => {
          const { tintColor } = props;
          return <Icon color={tintColor} name={'eyeo'} size={25}/>
        },
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: (props) => {
          const { tintColor } = props;
          return <Icon color={tintColor} name={'setting'} size={25}/>
        },
      }
    }
  },
  {
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'green',
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
