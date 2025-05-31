import axios from "axios";
// import { getCookie } from "cookies-next/client";
import Cookies from "universal-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const cookies = new Cookies(null, { path: "/" });

const getToken = async () => {
  const token = await cookies.get("token");
  return token;
};
// const token = getCookie("token");

interface EditBlogData {
  blogId: string;
  blogData: any;
}

interface CreateCommentData {
  blogId: string;
  comment: {
    comment:string
  }
}

export const createBlog = async (credentials: any) => {
  const token = await getToken();
  try {
    const res = await axios.post(`${BASE_URL}blogs`, credentials, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("An error was encountered, unable to post this blog.", error);
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}blogs`);
    return res.data;
  } catch (error) {
    console.log("An error occured, unable to retrieve your blogs.", error);
  }
};
export const getBlogCategoryCount = async () => {
  try {
    const res = await axios.get(`${BASE_URL}blogs/category-count`);
    return res.data;
  } catch (error) {
    console.log(
      "An error occured, unable to retrieve blog count by categories.",
      error
    );
  }
};

export const getASingleBlog = async (blogId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}blogs/${blogId}`);
    return res.data;
  } catch (error) {
    console.log(
      `An error occured, unable to retrieve this blog with id ${blogId}.`
    );
    throw error;
  }
};

export const editBlog = async ({ blogId, blogData }: EditBlogData) => {
  const token = await getToken();
  try {
    const res = await axios.patch(`${BASE_URL}blogs/${blogId}`, blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(
      `An error occured, unable to update this blog with id ${blogId}.`,
      error
    );
  }
};

export const deleteBlog = async (blogId: string) => {
  const token = await getToken();
  try {
    const res = await axios.delete(`${BASE_URL}blogs/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(
      `An error occured, unable to delete blog with id ${blogId}`,
      error
    );
  }
};

export const createBlogComment = async ({
  blogId,
  comment,
}: CreateCommentData) => {
  const token = await getToken();
  try {
    const res = await axios.post(
      `${BASE_URL}blogs/comment/${blogId}`,
      comment,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("An error occured, unable to submit comment", error);
  }
};

export const toggleLoveABlog = async (blogId: string) => {
  const token = await getToken();
  try {
    const res = await axios.patch(
      `${BASE_URL}blogs/love/${blogId}`,
      {}, //no request body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("An error occured, unable to submit comment", error);
    throw error;
  }
};
