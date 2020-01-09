import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from '@root/selectors';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';

export const DrawerTrigger = withNavigation((props: NavigationInjectedProps) => {
  const { navigation } = props;
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const primary = isDarkMode ? DARK_THEME.PRIMARY : PRIMARY_THEME.PRIMARY;

  return (
    <TouchableOpacity
      style={styles.trigger}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Icon name={'list'} size={40} color={primary} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  trigger: {
    marginLeft: 10,
    marginTop: 5,
  },
});
