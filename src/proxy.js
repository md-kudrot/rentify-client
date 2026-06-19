// src/proxy.js
import { NextResponse } from "next/server"
import { auth } from "./lib/auth"
import { headers } from "next/headers"

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        const loginUrl = new URL("/sign-in", request.url)
        loginUrl.searchParams.set("callbackUrl", request.url)
        return NextResponse.redirect(loginUrl)
    }
}

export const config = {
    matcher: ["/properties/:path*", "/saved/:path*", "/bookings/:path*", "/investments/:path*", "/properties"]
}
