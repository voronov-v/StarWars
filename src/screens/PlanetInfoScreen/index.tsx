import React, {FC, ReactElement} from 'react';
import {PlanetInfoView} from "./PlanetInfoView";
import {NavigationStackScreenProps} from "react-navigation-stack";
import {PlanetType} from "@root/screens/PlanetsScreen/types";

export const PlanetInfoScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps,): ReactElement<NavigationStackScreenProps> => {

  const {navigation} = props;
  const data: PlanetType = navigation.state.params.item;

  return <PlanetInfoView data={data}/>
};
