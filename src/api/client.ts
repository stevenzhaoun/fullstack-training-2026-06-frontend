import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3000',
    // headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVJZCI6MSwiaWF0IjoxNzgyODc1MTQ0LCJleHAiOjE3ODI5NjE1NDR9.2qD7FhK6fZVDh-8qdr5Xg7dsXmysP1l_lCKHh_YHldE`
    // }
})

export default client