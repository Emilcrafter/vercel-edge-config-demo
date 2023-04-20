import { NextResponse, NextRequest } from "next/server";

import {get} from '@vercel/edge-config'

export async function middleware(req: NextRequest) {
    console.log("Middleware called");
    const response = NextResponse.next();
    const edgeConfig = await get("demo");
    console.log("Edge Config", edgeConfig);
    edgeConfig && response.headers.append("Edge-Config", edgeConfig.toString());
    return response;
    }

    export const config = {
     matcher: [
        "/secret/",
    ]
    };
