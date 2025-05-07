import {jwtDecode} from 'jwt-decode';

export interface MyJwtPayload {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    authorImg: string;
    iat: number;
    exp: number;
}

export function getDecodedToken(token: string): MyJwtPayload | null {
  try {
    const decoded = jwtDecode<MyJwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
