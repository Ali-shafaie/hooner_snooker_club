import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const token = await getToken({ req });

    const isAuthenticated = !!token;
  }
  // {
  //   callbacks: {
  //     authorized: ({ token }) => token?.role === "admin",
  //   },
  // }
);

export const config = {
  matcher: ["/ff"],
};
