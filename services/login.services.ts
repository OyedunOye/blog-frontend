import axios from "axios";
// const BASE_URL = 'http://localhost:3001/api/login'
const BASE_URL = "https://blog-backend-u8d7.onrender.com/api/login";
// const BASE_URL = process.env.BASE_URL

export const userLogin = async (credentials: any) => {
  try {
    const res = await axios.post(BASE_URL, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    // const res = await axios.post(`${BASE_URL}login`, credentials, {headers:{"Content-Type": "application/json"}})
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
