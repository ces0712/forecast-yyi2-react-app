import axios from 'axios';

export const FETCH_CITY = 'FETCH_CITY';
export const FETCH_CITIES = 'FETCH_CITIES';


const ROOT_URL = 'http://127.0.0.1:8081';
const CONFIG = {
  auth: {
    username: 'test',
    password: 'test',
  }
};

export function fetchCity(id) {
  const request = axios.get(`${ROOT_URL}/v1/cities/${id}`,CONFIG);
  return {
    type: FETCH_CITY,
    payload: request
  };
}

export function fetchCities() {
  const request = axios.get(`${ROOT_URL}/v1/cities`,CONFIG);
  return {
    type: FETCH_CITIES,
    payload: request
  };
}