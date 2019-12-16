import { ListRenderItem } from 'react-native';
import { ReactNode } from 'react';
import { FilmType} from "../FilmsScreen/types";

export type RenderItemFilm = ListRenderItem<FilmType>;
export type RenderItemPeople = ListRenderItem<PeopleType>;

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
}

export type PlanetInfoViewProps = {
  sections: any,
  planetInfo: any,
  keyExtractros: any,
  renderSectionHeader: any,
  listHeaderComponent: any,
  renderItem: any,
};

export type FilmInfoProps = {
  item: FilmType
}

export type ResidentInfoProps = {
  item: PeopleType
}

export type IProps = {
  children: ReactNode;
}
