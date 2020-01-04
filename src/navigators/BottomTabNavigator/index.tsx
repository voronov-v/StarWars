import React from 'react' ;
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import {HomeScreen} from '../../screens/HomeScreen/HomeScreen';
import PlanetScreenNavigator from '../PlanetsScreenNavigator';
import {colors, DARK_THEME, PRIMARY_THEME} from '../../consts/themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {getIsDarkMode} from '@root/selectors';
import {themeType} from '@root/redux/reducers/settingsReducer';
import FilmsScreenNavigator from "@root/navigators/FilmsScreenNavigator";

const TabBarComponent = (props: any) => {
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [bgColor, activeTintColor, inactiveTintColor] = [theme.default, theme.PRIMARY, theme.SECONDARY];
  const newProps = {...props, activeTintColor: activeTintColor, inactiveTintColor: inactiveTintColor};
  return <BottomTabBar {...newProps} style={{backgroundColor: bgColor}}/>;
};

type CustomIconType = { tintColor?: string, name: string, size: number }

const CustomIcon = (props: CustomIconType) => {
  const {tintColor, name, size} = props;
  console.log('props', props);
  return <Icon color={tintColor} name={name} size={size}/>;
};

export const BottomTabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: props => <CustomIcon {...props} name={'home'} size={25}/>
      },
    },
    Planets: {
      screen: PlanetScreenNavigator,
      navigationOptions: {
        tabBarIcon: props => <CustomIcon {...props} name={'language'} size={25}/>,
        tabBarLabel: 'Planets',
      },
    },
    Films: {
      screen: FilmsScreenNavigator,
      navigationOptions: () => {
        return {
          title: 'Films',
          tabBarIcon: props => <CustomIcon {...props} name={'movie'} size={25}/>,
        }
      }
    },
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
