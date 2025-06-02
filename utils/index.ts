import { getDecodedToken } from '@/hooks/getDecodeToken/getDecodedToken';
// import { getCookie } from 'cookies-next/client';
import Cookies from "universal-cookie";
import { toast } from 'react-toastify';

export const toasterAlert = (message: string)=> toast(message, {
    position: "top-right",
    autoClose: 5000,
    // hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
  });

export function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

//alternative to formatDate for my future reference
export function formatDate2(isoDateString: string): string {
  const date = new Date(isoDateString);
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formatter.format(date); // e.g., "29 Apr 2025"
}

const cookies = new Cookies(null, { path: "/" });

export const getToken = async () => {
  const token = await cookies.get("token");
  return token;
};

const token = await getToken();

// const token = getCookie("token");

export const userName = () => {
  if (token) {
    const decoded = getDecodedToken(token);
    console.log(decoded);
    if (decoded !== null) {
      return decoded?.firstName + " " + decoded?.lastName;
    } else {
      return "";
    }
  }
};

export const loggedInUserId = () => {
    if (token) {
      const userDetails = getDecodedToken(token);
      // toggleLike.updatedBlog.loves.indexOf(userDetails.id) !== -1
      return userDetails?.id;
    } else {
      return null;
    }
  };