import { FlatListProps, ListRenderItem } from 'react-native';

export type FilmType = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: [];
  starships: [];
  vehicles: [];
  characters: [];
  planets: [];
  url: string;
  created: string;
  edited: string;
};

export type KeyExtractor = FlatListProps<FilmType>['keyExtractor'];

export type FilmsScreenViewProps = {
  keyExtractor: KeyExtractor;
  renderItem: RenderItem;
  data: FilmsData;
};

export type RenderItem = ListRenderItem<FilmType>;

export type FilmsData = FilmType[];
