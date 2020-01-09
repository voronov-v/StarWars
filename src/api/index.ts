import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://swapi.co/api/',
});

export const API = {
  getPlanets: async (url?: string) => {
    let data;
    console.log('url: ' + url);
    if (url) {
      data = await axios.get(url);
    } else {
      data = await instance.get('planets/');
    }
    console.log('API getPlanets data', data);
    return data.data;
  },
  getFilms: async () => {
    let data = await instance.get('films/');
    console.log('API getFilms data', data);
    return data.data.results;
  },
  getPlanetInfo: async (url: string) => {
    let data = await axios.get(url);
    console.log('API getPlanetInfo data', data);
    return data.data;
  },
  getCurrencyList: async (url: string) => {
    let data = await axios.get(url);
    console.log('API getCurrencyList data', data);
    return data.data;
  },
  getCurrency: async (url: string) => {
    let data = await axios.get(url);
    // console.log('API getCurrency data', data);
    return data.data;
  },
};
