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
    if (!token || token.split(".").length !== 3) {
      return null; // Invalid token format
    }
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};