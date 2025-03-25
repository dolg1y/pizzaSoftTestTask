import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://parseapi.back4app.com/classes',
  headers: {
    Accept: 'application/json',
    'X-Parse-Application-Id': 'l3zNqbDePGMqRVjdhJnBPPKenAXSxtRXWMluYlfk',
    'X-Parse-REST-API-Key': 'aAhRQExOdyM8CwHDsaOyw0AIN9I3jnv0Gg0OKzx6',
  },
});

export default apiClient;
