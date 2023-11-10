import axios from 'axios';

const apiPort = 7118;
const localApiUrl = `https://localhost:${apiPort}/api`;
const externalApiUrl = null;

const api = axios.create({
    baseURL: localApiUrl
});

export default api;