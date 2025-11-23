import axios from 'axios';

const clientAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

clientAxios.interceptors.request.use (function (response){
    
    let token = localStorage.getItem('token')

    if(token) response.headers.Authorization = `Bearer ${token}`

    return response;


}, (error) => Promise.reject(error))

export default clientAxios;