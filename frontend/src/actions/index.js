import axios from 'axios';

export const FETCH_CITY = 'FETCH_CITY';

const ROOT_URL = 'http://127.0.0.1:8081';


export function fetchCity(id) {
  const config = {
    auth: {
      username: 'test',
      password: 'test',
    }
  };


  const request = axios.get(`${ROOT_URL}/v1/cities/${id}`,config);
  return {
      type: FETCH_CITY,
      payload: request
  };

}