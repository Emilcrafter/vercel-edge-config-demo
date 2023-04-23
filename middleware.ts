import { NextResponse, NextRequest } from "next/server";

import {get} from '@vercel/edge-config'
import { NextURL } from "next/dist/server/web/next-url";


export async function middleware(req: NextRequest) {
    
    console.log("Middleware called");
    const response = NextResponse.next();

    console.time("Get config in middleware");
    const edgeConfig = await get("demo");
    console.timeEnd("Get config in middleware");

    console.time("Fetch file from AWS S3");
    const staticFile = await fetch("https://apartly-ab-image-bucket.s3.eu-north-1.amazonaws.com/config.json")
    console.timeEnd("Fetch file from AWS S3");

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
