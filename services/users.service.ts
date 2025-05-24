import { getDecodedToken } from '@/hooks/getDecodeToken/getDecodedToken';
import { getToken } from '@/utils';
import axios from 'axios'
import { getCookie } from 'cookies-next/client';
// const BASE_URL = 'http://localhost:3001/api/users'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// const token = await getToken();
const token = getCookie("token");

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
        const token = getCookie("token");
        // console.log(token)

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

export const updateUserProfile = async(updateItem: any)=>{
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