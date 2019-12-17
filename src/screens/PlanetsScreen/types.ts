import { FlatListProps, ListRenderItem } from 'react-native';
import { PeopleType } from '../PlanetInfoScreen/types';
import { FilmType } from '../FilmsScreen/types';

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
};

export type KeyExtractor = FlatListProps<PlanetType>['keyExtractor'];

export type PlanetsScreenViewProps = {
  keyExtractor: KeyExtractor;
  renderItem: RenderItem;
  data: PlanetsData;
  // loadData: Function
};

export type RenderItem = ListRenderItem<PlanetType>;

export type PlanetsData = PlanetType[];
