import axios from 'axios'

const http = axios.create({
    baseURL : 'http://localhost:8081/',
    Accept :'application/json',
    'Content-Type' : 'application/json'
})

export default http