import { SectionListData, SectionListProps, SectionListRenderItem } from 'react-native';
import { FilmType } from '../FilmsScreen/types';
import { PlanetType } from '@root/screens/PlanetsScreen/types';

export type RenderItem = SectionListRenderItem<FilmType | PlanetType>;

export type PeopleType = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: FilmType[];
  species: [];
  starships: [];
  vehicles: [];
  url: string;
  created: string;
  edited: string;
};

export type KeyExtractor = SectionListProps<FilmType | PeopleType>['keyExtractor'];

export type PlanetInfoDataType = { title: string; icon: string; data: FilmType[] | PlanetType[] };

export type RenderSectionHeaderType = {
  section: SectionListData<PlanetInfoDataType>;
};

export type PlanetInfoViewProps = {
  sections: any;
  keyExtractor: KeyExtractor;
  renderSectionHeader: any;
  listHeaderComponent: any;
  renderItem: any;
  bgColor: string;
};

export type ItemInfoProps = {
  item: any;
  type: string;
};
