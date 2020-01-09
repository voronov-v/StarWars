import {
  createDrawerNavigator,
  DrawerActions,
  DrawerIconProps,
  DrawerItems,
} from 'react-navigation-drawer';
import { ConverterScreen } from '@root/screens/ConverterScreen';
import { SettingsScreen } from '@root/screens/SettingsScreen';
import { BottomTabNavigator } from '../BottomTabNavigator';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from '@root/selectors';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';

const CustomDrawerContentComponent = (props: any) => {
  const { navigation } = props;
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [bgColor, activeTintColor, inactiveTintColor] = [
    theme.BACKGROUND,
    theme.PRIMARY,
    theme.ON_BACKGROUND,
  ];
  const newProps = {
    ...props,
    activeTintColor: activeTintColor,
    inactiveTintColor: inactiveTintColor,
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        style={{ marginLeft: 10, marginTop: 5 }}
      >
        <Icon name={'clear-all'} size={40} color={activeTintColor} />
      </TouchableOpacity>
      <DrawerItems {...newProps} />
    </View>
  );
};

type CustomIconType = DrawerIconProps & { name: string; size: number };
const CustomIcon = (props: CustomIconType) => {
  const { tintColor, name, size } = props;
  return <Icon color={tintColor} name={name} size={size} />;
};

export const DrawerNavigator = createDrawerNavigator(
  {
    StarWars: {
      screen: createAppContainer(BottomTabNavigator),
      navigationOptions: {
        title: 'StarWars',
        drawerIcon: (props) => <CustomIcon {...props} name={'star-border'} size={25} />,
      },
    },
    Converter: {
      screen: ConverterScreen,
      // screen: ConverterScreen,
      navigationOptions: {
        title: 'Converter',
        drawerIcon: (props) => <CustomIcon {...props} name={'all-inclusive'} size={25} />,
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        drawerIcon: (props) => <CustomIcon {...props} name={'settings'} size={25} />,
      },
    },
  },
  {
    contentComponent: (props) => <CustomDrawerContentComponent {...props} />,
    drawerPosition: 'left',
    initialRouteName: 'Converter',
    contentOptions: {
      labelStyle: { fontSize: 16, marginLeft: 0 },
    },
  },
);
