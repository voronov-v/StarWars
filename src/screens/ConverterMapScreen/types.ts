import { ImageURISource } from 'react-native';

export type locationType = {
  lat: number;
  lng: number;
};

export type gPlaceType = {
  geometry: {
    location: locationType;
  };
  viewport: {
    northeast: locationType;
  };
  southwest: locationType;
  icon: ImageURISource | undefined;
  id: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  place_id: string;
  plus_code: {
    compound_code: string;
  };
  global_code: string;
  reference: string;
  scope: string;
  types: string[];
  vicinity: string;
};
