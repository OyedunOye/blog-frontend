
import axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const userLogin = async (credentials: any) => {
    try {
        const res = await axios.post(`${BASE_URL}login`, credentials, {headers:{"Content-Type": "application/json"}})
        return res.data
    } catch (error) {
        console.log(error)
    }
}
