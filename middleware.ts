import { NextResponse, NextRequest } from "next/server";

import {get} from '@vercel/edge-config'

export async function middleware(req: NextRequest) {
    console.log("Middleware called");
    const response = NextResponse.next();
    const edgeConfig = await get("demo");
    console.log("Edge Config", edgeConfig);
    const {mac, requireCaptcha = false } = edgeConfig as {mac: string, requireCaptcha: boolean};
    mac && response.headers.append("edge-config", mac.toString());
    response.headers.append("require-captcha", requireCaptcha.toString());
    return response;
    }

    export const config = {
     matcher: [
        "/secret/",
        "/secret/:path*",
        "/"
    ]
    };
