import React from 'react';
import { BottomTabBar, createBottomTabNavigator } from 'react-navigation-tabs';
import { colors, DARK_THEME, PRIMARY_THEME } from '../../consts/themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from '@root/selectors';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { ConverterScreen } from '@root/screens/ConverterScreen';
import { GraphScreen } from '@root/screens/GraphScreen';
import { FBScreen } from '@root/screens/FBScreen';

const TabBarComponent = (props: any) => {
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [bgColor, activeTintColor, inactiveTintColor] = [theme.default, theme.PRIMARY, theme.SECONDARY];
  const newProps = {
    ...props,
    activeTintColor: activeTintColor,
    inactiveTintColor: inactiveTintColor,
  };
  return <BottomTabBar {...newProps} style={{ backgroundColor: bgColor }} />;
};

type CustomIconType = { tintColor?: string; name: string; size: number };

const CustomIcon = (props: CustomIconType) => {
  const { tintColor, name, size } = props;
  return <Icon color={tintColor} name={name} size={size} />;
};

export const ConverterBottomNavigator = createBottomTabNavigator(
  {
    Converter: {
      screen: ConverterScreen,
      navigationOptions: {
        title: 'Converter',
        tabBarIcon: (props) => <CustomIcon {...props} name={'attach-money'} size={25} />,
      },
    },
    Graph: {
      screen: GraphScreen,
      navigationOptions: {
        title: 'Graph',
        tabBarIcon: (props) => <CustomIcon {...props} name={'trending-up'} size={25} />,
      },
    },
    FBLogin: {
      screen: FBScreen,
      navigationOptions: {
        title: 'FB',
        tabBarIcon: (props) => <CustomIcon {...props} name={'perm-identity'} size={25} />,
      },
    },
  },
  {
    tabBarComponent: (props) => <TabBarComponent {...props} />,
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
