import axios from "axios";

const instance = axios.create({
  baseURL: 'https://swapi.co/api/',
});

export const API = {
  getPlanets: async () => await instance.get('planets/'),
  getFilms: async () => await instance.get('films/')
};
