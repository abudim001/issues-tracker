import { auth } from "@/auth"; 
import { NextResponse } from "next/server"; 

export default auth((req) => { 
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/api/auth/signin", req.url); 
  }
  return NextResponse.next(); 
});

export const config = {
  matcher: [
    '/issues/new', 
    '/issues/edit/:id+', 
  ],
};
