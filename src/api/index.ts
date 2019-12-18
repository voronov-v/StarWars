import axios from "axios";

const instance = axios.create({
  baseURL: 'https://swapi.co/api/',
});

export const API = {
  getPlanets: async () => await instance.get('planets/'),
  getFilms: async () => await instance.get('films/'),
  getPlanetInfo: async (url:string) => {
    let data = await axios.get(url);
    console.log('getPlanetInfo data', data);
    return data.data;
  }
};
