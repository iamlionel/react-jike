import axios from 'axios'
import { clearToken, getToken } from './token'
import router from '@/router'

//base url
const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

//request interceptor
request.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

//response interceptor
request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    if (error.response.status === 401) {
        clearToken()
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})

export { request }