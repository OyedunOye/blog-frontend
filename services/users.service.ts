import axios from 'axios'
// const BASE_URL = 'http://localhost:3001/api/users'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createUser = async (credentials: any) => {
    try {
        const res = await axios.post(`${BASE_URL}users`, credentials, {headers:{"Content-Type": "multipart/form-data"}})
        return res.data
    } catch (error){
        console.log(error)
    }
}

export const getAllAuthors = async() => {
    try {
        const res = await axios.get(`${BASE_URL}users/authors`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}