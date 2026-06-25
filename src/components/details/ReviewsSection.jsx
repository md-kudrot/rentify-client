"use client"

import { useState, useEffect } from "react"
import { authClient, useSession } from "@/lib/auth-client"

function StarInput({ value, onChange }) {
    const [hovered, setHovered] = useState(0)
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="text-[28px] transition-transform hover:scale-110"
                >
                    <span className={hovered >= star || value >= star ? "text-[#ffb77e]" : "text-[#534438]/40"}>★</span>
                </button>
            ))}
        </div>
    )
}

function StarDisplay({ value }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-[16px] ${value >= star ? "text-[#ffb77e]" : "text-[#534438]/40"}`}>
                    ★
                </span>
            ))}
        </div>
    )
}

function ReviewCard({ review, currentUserEmail, onEdit }) {
    const isOwner = review.userEmail === currentUserEmail
    const date = new Date(review.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })

    return (
        <div className="bg-[#ffffff06] border border-[#534438]/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="font-semibold text-white text-[16px]">{review.userName}</p>
                    <p className="text-[#d9c2b3]/60 text-[12px]">{review.userEmail}</p>
                    <p className="text-[#d9c2b3]/50 text-[12px]">{date}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <StarDisplay value={review.rating} />
                    {isOwner && (
                        <button
                            onClick={() => onEdit(review)}
                            className="text-[12px] text-[#ffb77e] border border-[#ffb77e]/30 px-3 py-1 rounded-lg hover:bg-[#ffb77e]/10 transition-all"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
            <p className="text-[#d9c2b3] text-[15px] leading-relaxed">{review.comment}</p>
        </div>
    )
}

export default function ReviewSection({ propertyId }) {
    const { data: session } = useSession()
    const user = session?.user

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    // Form state
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")

    // Edit state
    const [editingReview, setEditingReview] = useState(null)
    const [editRating, setEditRating] = useState(0)
    const [editComment, setEditComment] = useState("")

    const fetchReviews = async () => {
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/${propertyId}`, {
                headers: {
                    Authorization: `Bearer ${tokenData?.token}`
                }
            })
            const data = await res.json()
            setReviews(data.reviews || [])
        } catch {
            console.error("Failed to fetch reviews")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [propertyId])

    const handleSubmit = async () => {
        setError("")
        if (rating === 0) return setError("Please select a rating")
        if (!comment.trim()) return setError("Please write a comment")

        setSubmitting(true)
        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({ propertyId, rating, comment })
            })
            const data = await res.json()
            if (!res.ok) return setError(data.message || "Failed to submit")

            setRating(0)
            setComment("")
            fetchReviews()
        } catch (err) {
            console.error("Actual error:", err)
            setError("Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }

    const handleEditSave = async () => {
        if (editRating === 0) return
        if (!editComment.trim()) return

        try {
            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/${editingReview._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({ rating: editRating, comment: editComment })
            })
            if (res.ok) {
                setEditingReview(null)
                fetchReviews()
            }
        } catch {
            console.error("Edit failed")
        }
    }

    const alreadyReviewed = reviews.some((r) => r.userEmail === user?.email)

    return (
        <div className="space-y-8 mt-10">
            <h2 className="text-[24px] font-bold text-[#ffb77e]">Reviews ({reviews.length})</h2>

            {/* Add Review Form */}
            {user && !alreadyReviewed && (
                <div className="bg-[#ffffff06] border border-[#534438]/20 rounded-2xl p-6 space-y-4">
                    <h3 className="text-[18px] font-semibold text-white">Write a Review</h3>

                    {/* Star Rating */}
                    <div className="space-y-1">
                        <label className="text-[12px] font-semibold text-[#d9c2b3] uppercase tracking-widest">
                            Give Rating
                        </label>
                        <StarInput value={rating} onChange={setRating} />
                    </div>

                    {/* Comment */}
                    <div className="space-y-1">
                        <label className="text-[12px] font-semibold text-[#d9c2b3] uppercase tracking-widest">
                            Write Review
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            placeholder="Share your experience..."
                            className="w-full bg-[#130d08] border border-[#534438]/20 rounded-xl px-4 py-3 text-white text-[15px] placeholder:text-[#d9c2b3]/40 focus:border-[#ffb77e] outline-none resize-none transition-all"
                        />
                    </div>

                    {error && <p className="text-red-400 text-[13px]">{error}</p>}

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="px-6 py-3 copper-gradient cursor-pointer bg-[#ffb77e] text-[#0B1120] font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </div>
            )}

            {!user && <p className="text-[#d9c2b3]/60 text-[14px]">Please log in to write a review.</p>}

            {alreadyReviewed && (
                <p className="text-[#ffb77e]/70 text-[14px]">You have already reviewed this property.</p>
            )}

            {/* Edit Modal */}
            {editingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-[#130d08] border border-[#534438]/30 rounded-2xl p-6 w-1/3 space-y-4">
                        <h3 className="text-[18px] font-bold text-white">Edit Review</h3>

                        <div className="space-y-1">
                            <label className="text-[12px] font-semibold text-[#d9c2b3] uppercase tracking-widest">
                                Rating
                            </label>
                            <StarInput value={editRating} onChange={setEditRating} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[12px] font-semibold text-[#d9c2b3] uppercase tracking-widest">
                                Comment
                            </label>
                            <textarea
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                rows={4}
                                className="w-full bg-[#0B1120] border border-[#534438]/20 rounded-xl px-4 py-3 text-white text-[15px] focus:border-[#ffb77e] outline-none resize-none transition-all"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleEditSave}
                                className="flex-1 py-3 copper-gradient bg-[#ffb77e] text-[#0B1120] font-bold rounded-xl hover:scale-[1.02] transition-all"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setEditingReview(null)}
                                className="flex-1 py-3 bg-[#ffffff08] border border-[#534438]/20 text-white font-bold rounded-xl hover:bg-[#ffffff12] transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-[#ffffff06] border border-[#534438]/20 rounded-2xl p-5 h-32"
                        />
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <p className="text-[#d9c2b3]/50 text-[15px]">No reviews yet. Be the first to review!</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            currentUserEmail={user?.email}
                            onEdit={(r) => {
                                setEditingReview(r)
                                setEditRating(r.rating)
                                setEditComment(r.comment)
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

