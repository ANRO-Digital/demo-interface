import axios from "axios";

export const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://test.robis-m.com'
})
export const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://test.robis-m.com'
})

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)