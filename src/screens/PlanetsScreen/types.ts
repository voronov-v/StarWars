import { FlatListProps, ListRenderItem } from 'react-native';

export type PlanetType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  url: string;
};

export type KeyExtractor = FlatListProps<PlanetType>['keyExtractor'];

export type PlanetsScreenViewProps = {
  keyExtractor: KeyExtractor;
  renderItem: RenderItem;
  data: PlanetsData;
};

export type RenderItem = ListRenderItem<PlanetType>;

export type PlanetsData = PlanetType[];
