import axios from 'axios';

const apiPort = 7118;
const localApiUrl = `https://localhost:${apiPort}/api`;
const externalApiUrl = 'https://event-webapi-matheus.azurewebsites.net/api';

const api = axios.create({
    baseURL: externalApiUrl
});

export default api;