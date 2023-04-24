import { NextResponse, NextRequest } from "next/server";

import {EdgeConfigItems, EdgeConfigValue, get} from '@vercel/edge-config'
import { NextURL } from "next/dist/server/web/next-url";

async function handleQr(req : NextRequest, config : EdgeConfigValue){
    const colors = ["red", "green", "blue", "yellow", "pink"];

    const color = colors[Math.floor(Math.random() * colors.length)];

    const response = (config as {redirectQr?: boolean}).redirectQr ? NextResponse.redirect(new NextURL(`/color/${color}`, req.nextUrl)) : NextResponse.next();

    return response;
    
}

export async function middleware(req: NextRequest) {
    
    console.log("Middleware called");
    const response = NextResponse.next();

    console.time("Get config in middleware");
    const edgeConfig = await get("demo");
    console.timeEnd("Get config in middleware");
    if(!edgeConfig) {
        throw new Error("No config found");
    }

    // If route is /qr
    if(req.nextUrl.pathname === "/qr") {
        console.log("Handling QR");
        return handleQr(req, edgeConfig);
    }

    const fileUrl = process.env.S3_FILE;

    if(fileUrl){
        console.time("Fetch file from AWS S3");
        const staticFile = await fetch(fileUrl);
        console.timeEnd("Fetch file from AWS S3");
    } else {
        console.error("No file url provided");
    }

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
        "/",
        "/qr",
    ]
    };
