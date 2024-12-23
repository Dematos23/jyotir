import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
    const url = req.nextUrl.pathname

    if (url === "/") {
        
    }
}