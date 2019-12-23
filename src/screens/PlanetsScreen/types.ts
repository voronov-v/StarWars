import {FlatListProps, ListRenderItem} from 'react-native';
import {PeopleType} from '../PlanetInfoScreen/types';
import {FilmType} from '../FilmsScreen/types';
import * as React from "react";

export type PlanetType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
  residents: PeopleType[];
  films: FilmType[];
  created: string;
  url: string;
  planetInfo?: object
};

export type KeyExtractor = FlatListProps<PlanetType>['keyExtractor'];

export type PlanetsScreenViewProps = {
  keyExtractor: KeyExtractor;
  renderItem: RenderItem;
  data: PlanetsData;
  ListHeaderComponent: React.ComponentType<any>;
};

export type RenderItem = ListRenderItem<PlanetType>;

export type PlanetsData = PlanetType[];
