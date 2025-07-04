import axios from 'axios'


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const subscribeToNewsletter = async (credentials: any) => {
    try {
        const res = await axios.post(`${BASE_URL}subscribers`, credentials, {headers:{"Content-Type": "application/json"}})
        return res.data
    } catch (error){
        console.log(error)
    }
}

export const unsubscribeToNewsletter = async (credentials: any) => {
    try {
        const res = await axios.patch(`${BASE_URL}subscribers/unsubscribe`, credentials, {headers:{"Content-Type": "application/json"}})
        return res.data
    } catch (error:any){
        console.log(error)
        return error.response.data || {error: "Something went wrong, please try again."}
    }
}