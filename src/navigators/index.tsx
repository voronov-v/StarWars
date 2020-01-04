import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {DrawerNavigator} from "@root/navigators/DrawerNavigator";

export const RootNavigator = createAppContainer(
  createSwitchNavigator({
    Main: DrawerNavigator,
  })
);
