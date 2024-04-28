import axios from 'axios'

//base url
const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

//request interceptor
request.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

//response interceptor
request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    return Promise.reject(error)
})

export { request }