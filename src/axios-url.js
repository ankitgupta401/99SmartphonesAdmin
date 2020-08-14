import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://blog.99smartphones.in/api/common/'
     baseURL:'http://localhost:3000/api/common/'
});

export default instance;