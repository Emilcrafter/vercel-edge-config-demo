import { NextResponse, NextRequest } from "next/server";

import {get} from '@vercel/edge-config'
import { NextURL } from "next/dist/server/web/next-url";

export async function middleware(req: NextRequest) {
    console.log("Middleware called");
    const response = NextResponse.next();
    console.time("middleware");
    const edgeConfig = await get("demo");
    console.timeEnd("middleware");
    
    const {mac, requireCaptcha = false } = edgeConfig as {mac: string, requireCaptcha: boolean};
    const hasDoneCaptcha = req.cookies.get("captcha")?.value === "true";

    let stillNeedCaptcha = requireCaptcha && !hasDoneCaptcha;

    if(stillNeedCaptcha && req.nextUrl.pathname.match(/\/secret(\/.*)?/)) {
        console.log("Redirecting to captcha");
        const newResponse = NextResponse.redirect(new NextURL("/", req.nextUrl));
        newResponse.headers.append("require-captcha", stillNeedCaptcha.toString());
        return newResponse;
    }

    mac && response.headers.append("edge-config", mac.toString());
    response.headers.append("require-captcha", stillNeedCaptcha.toString());


    return response;
    }

    export const config = {
     matcher: [
        "/secret/",
        "/secret/:path*",
        "/"
    ]
    };
