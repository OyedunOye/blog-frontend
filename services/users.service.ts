import { getToken } from '@/utils';
import axios from 'axios'

interface ToggleTwoFAProp {
    status: boolean
}

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

export const getAUser = async() => {
    try {
        const token = await getToken();

        const res = await axios.get(`${BASE_URL}users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const changeUserPassword = async(updateItem: any)=>{
    const token = await getToken()
    try {
        const res = await axios.patch(`${BASE_URL}users/change-password`, updateItem, {
            headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
        })

    return res.data
    } catch (error) {
        console.log("An error occured, unable to retrieve your blogs.", error);
    }
}

export const toggleTwoFA = async(status:ToggleTwoFAProp)=>{
    const token = await getToken()
    try {
        const res = await axios.patch(`${BASE_URL}users/toggle-two-fa`, status, {
            headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
        })

    return res.data
    } catch (error) {
        console.log("An error occured, unable to toggle the two FA button.", error);
    }
}

export const updateUserProfile = async(updateItem: any)=>{
    const token = await getToken()
    try {
        const res = await axios.patch(`${BASE_URL}users/edit-profile`, updateItem, {
            headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
        })

    return res.data
    } catch (error) {
        console.log("An error occured, unable to retrieve your blogs.", error);
    }
}

export const deactivateUserAccount = async() => {
    const token = await getToken();
    try {

        const res = await axios.patch(`${BASE_URL}users/deactivate-profile`,
            {}, //no request body
            {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}