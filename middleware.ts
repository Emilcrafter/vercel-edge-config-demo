import { NextResponse, NextRequest } from "next/server";

import {get} from '@vercel/edge-config'
import { NextURL } from "next/dist/server/web/next-url";


export async function middleware(req: NextRequest) {
    
    console.log("Middleware called");
    const response = NextResponse.next();

    console.time("middleware");
    const edgeConfig = await get("demo");
    console.timeEnd("middleware");

    console.time("fetch file");
    const staticFile = await fetch("https://apartly-ab-image-bucket.s3.eu-north-1.amazonaws.com/config.json")
    console.timeEnd("fetch file");

    const {requireCaptcha = false } = edgeConfig as {requireCaptcha: boolean};
    const hasDoneCaptcha = req.cookies.get("captcha")?.value === "true";

    let stillNeedCaptcha = requireCaptcha && !hasDoneCaptcha;

    if(stillNeedCaptcha && req.nextUrl.pathname.match(/\/secret(\/.*)?/)) {
        console.log("Redirecting to captcha");
        const newResponse = NextResponse.redirect(new NextURL("/", req.nextUrl));
        newResponse.headers.append("require-captcha", stillNeedCaptcha.toString());
        return newResponse;
    }

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
