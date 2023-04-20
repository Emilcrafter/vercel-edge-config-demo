import { NextResponse, NextRequest } from "next/server";

import {get} from '@vercel/edge-config'
import { NextURL } from "next/dist/server/web/next-url";

export async function middleware(req: NextRequest) {
    console.log("Middleware called");
    const response = NextResponse.next();
    const edgeConfig = await get("demo");

    const {mac, requireCaptcha = false } = edgeConfig as {mac: string, requireCaptcha: boolean};
    mac && response.headers.append("edge-config", mac.toString());
    response.headers.append("require-captcha", requireCaptcha.toString());

    const hasDoneCaptcha = req.cookies.get("captcha")?.value === "true";

    if(!hasDoneCaptcha && requireCaptcha && req.nextUrl.pathname.match(/\/secret(\/.*)?/)) {
        console.log("Redirecting to captcha");
        return NextResponse.redirect(new NextURL("/", req.nextUrl));
    }

    return response;
    }

    export const config = {
     matcher: [
        "/secret/",
        "/secret/:path*",
        "/"
    ]
    };
