import axios from 'axios';
const baseURL = require("./cred.json").baseUrl

const instance = axios.create({
   // baseURL: 'https://blog.99smartphones.in/api/common/'
     baseURL: baseURL + '/api/common/'
});

export default instance;