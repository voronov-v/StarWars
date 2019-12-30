import {FlatListProps, ListRenderItem} from 'react-native';
import {PeopleType} from '../PlanetInfoScreen/types';
import {FilmType} from '../FilmsScreen/types';
import {Namespace, UseTranslationOptions, UseTranslationResponse} from "react-i18next";

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
  isDarkMode: boolean;
  loading: boolean,
  loadNext: () => void;
  filterList: (text: string) => void;
  bgColor: string
  primaryVarBg: string
  primaryVar: string
  textColor: string
  t: (ns?:Namespace, options?: UseTranslationOptions,) => UseTranslationResponse
};

export type RenderItem = ListRenderItem<PlanetType>;

export type PlanetsData = PlanetType[];
