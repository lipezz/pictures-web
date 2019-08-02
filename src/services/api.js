import axios from 'axios';

import { endpoint } from '../consts';

const api = axios.create({ 
    baseURL:`http://${endpoint}/` 
});

export default api;