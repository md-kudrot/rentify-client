import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function PaymentSuccess({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id) redirect("/")

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"]
    })

    if (session.status === "open") redirect("/")

    if (session.status === "complete") {
        const { metadata, customer_details } = session
        const { token } = await auth.api.getToken({
            headers: await headers()
        })
        // Express server booking save
        await fetch(`${process.env.SERVER_URL}/api/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify({
                sessionId: session_id,
                userId: metadata.userId,
                userEmail: metadata.userEmail,
                propertyId: metadata.productId,
                title: metadata.title,
                nights: Number(metadata.nights),
                totalPrice: Number(metadata.totalPrice),
                status: "pending",
                bookedAt: new Date().toISOString(),
                ownerEmail: metadata.ownerEmail
            })
        })

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
                <div className="text-center space-y-4 p-10 rounded-2xl bg-[#1a202c] ">
                    <div className="text-5xl">🎉</div>
                    <h1 className="text-2xl font-bold text-white">Booking Confirmed!</h1>
                    <p className="text-[#d9c2b3]">
                        Confirmation sent to <span className="text-[#ffb77e]">{customer_details?.email}</span>
                    </p>
                    <p className="text-[#d9c2b3]">
                        <span className="text-white font-semibold">{metadata.title}</span> — {metadata.nights} night(s)
                    </p>
                    <p className="text-[#ffb77e] text-xl font-bold">${Number(metadata.totalPrice).toLocaleString()}</p>
                    <Link
                        href={`/dashboard/${metadata.role}/my-bookings`}
                        className="block mt-4 py-2 px-6 bg-[#ffb77e] text-[#0B1120] font-bold rounded-lg hover:bg-[#ffb77e]/90"
                    >
                        View My Bookings
                    </Link>
                </div>
            </div>
        )
    }
}
