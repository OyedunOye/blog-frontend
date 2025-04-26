import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";


// 1. Specifying protected and public routes
const protectedRoutes = ["/create-blog"];
const publicRoutes = ["/", "/login", "/signup", "/search"];

export default async function middleware(req: NextRequest) {
  // 2. Checking if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypting the session from the cookie
  const tokenCookie = (await cookies()).get("token")?.value ?? ""

  const session = decrypt(tokenCookie);


  //   5. Redirecting to / default login page if the admin is not authenticated
  if (
    isProtectedRoute &&
    (!session || !session?.id)
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();

}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
