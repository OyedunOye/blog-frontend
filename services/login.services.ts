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

export const verifyOtpAndLogin =async(credentials:any)=>{
    try {
        const res = await axios.post(`${BASE_URL}login/validate-otp`, credentials, {headers:{"Content-Type": "application/json"}})
        return res.data
    } catch (error:any) {
        // console.log(error)
        return error.response.data || {error: "Something went wrong, please attempt to login again."}
    }
}

export const resendOtp =async(credentials:any)=>{
    try {
        const res = await axios.post(`${BASE_URL}login/resend-otp`, credentials, {headers:{"Content-Type": "application/json"}})
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}
