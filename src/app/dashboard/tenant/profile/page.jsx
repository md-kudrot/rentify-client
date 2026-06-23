"use client"
// import { useState } from "react"
// import Icon from "@/components/Icon"
import { authClient } from "@/lib/auth-client"
// import Image from "next/image"
import Profile from "@/components/profile/Profile"
export default function ProfilePage() {
    // const {
    //     data: session,
    //     isPending, //loading state
    //     error, //error object
    //     refetch //refetch the session
    // } = authClient.useSession()

    // const user = session?.user

    return (
        <>
            <Profile />
        </>
    )
}

