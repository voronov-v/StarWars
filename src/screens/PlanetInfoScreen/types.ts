import { PlanetType } from '@root/screens/PlanetsScreen/types';
import { ListRenderItem } from 'react-native';
import { ReactNode } from 'react';

export type FilmType = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: [];
  species: [];
  starships: [];
  vehicles: [];
  characters: [];
  planets: [];
  url: string;
  created: string;
  edited: string;
}

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
  planetInfo: PlanetType,
  filmsInfo: FilmType[],
  residentsInfo: PeopleType[],
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
