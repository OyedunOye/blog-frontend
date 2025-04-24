import axios from 'axios'
import { getCookie } from "cookies-next/client";

const BASE_URL = 'http://localhost:3001/api/blogs'
const token = getCookie("token");


export const createBlog = async (credentials: any) => {
    try {
        const res = await axios.post(BASE_URL, credentials, {
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },

        })
        return res.data
    } catch (error){
        console.log("An error was encountered, unable to post this blog.", error)
    }
}


export const getAllBlogs = async () => {
    try {
        const res = await axios.get(BASE_URL, {
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
    } catch (error) {
        console.log("An error occured, unable to retrieve your blogs.", error)
    }
}


export const getASingleBlog = async (blogId:string) => {
    try {
        const res = await axios.get(`BASE_URL/${blogId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(`An error occured, unable to retrieve this blog with id ${blogId}.`)
    }
}


export const editBlog = async (credentials: any, blogId: string) => {
    try {
        const res = await axios.patch(`BASE_URL/${blogId}`, credentials, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
        })
        return res.data
    } catch (error) {
        console.log("An error occured, unable to update this blog with id ${blogId}.", error)
    }
}


export const deleteBlog = async (blogId:string) => {
    try {
        const res = await axios.delete(`BASE_URL/${blogId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    } catch (error) {
        console.log(`An error occured, unable to delete blog with id ${blogId}`, error)
    }
}