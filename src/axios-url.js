import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://blog.99smartphones.in/api/common/'
});

export default instance;