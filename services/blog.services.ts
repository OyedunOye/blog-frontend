import axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/blogs'

export const createBlog = async (credentials: any) => {
    try {
        const res = await axios.post(BASE_URL, credentials, {headers:{"Content-Type": "multipart/form-data"}})
        return res.data
    } catch (error){
        console.log(error)
    }
}