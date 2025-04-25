import "server-only";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

export const decrypt = (token: string) => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
