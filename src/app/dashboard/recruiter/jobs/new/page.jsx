"use client"

import { useState } from "react"
import { Xmark, ArrowShapeUpFromLine } from "@gravity-ui/icons"
import { createJob } from "@/lib/actions/jobs"

export default function JobPostingForm() {
    const [formData, setFormData] = useState({
        // Job Info
        jobTitle: "",
        jobCategory: "",
        jobType: [],
        salaryMin: "",
        salaryMax: "",
        currency: "USD",
        city: "",
        country: "",
        isRemote: false,
        deadline: "",

        // Job Description
        responsibilities: "",
        requirements: "",
        benefits: "",

        // Company
        company: "",

        // ✅ Logo image in state
        logoPreview: null
    })

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle checkbox changes for job type
    const handleJobTypeChange = (type) => {
        setFormData((prev) => ({
            ...prev,
            jobType: prev.jobType.includes(type) ? prev.jobType.filter((t) => t !== type) : [...prev.jobType, type]
        }))
    }

    // Handle remote toggle
    const handleRemoteToggle = () => {
        setFormData((prev) => ({
            ...prev,
            isRemote: !prev.isRemote
        }))
    }

    // ✅ UPDATED: Handle file upload - saves to formData
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    logoPreview: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Validation
            if (!formData.jobTitle || !formData.jobCategory || !formData.company) {
                alert("Please fill in all required fields")
                return
            }

            if (!formData.logoPreview) {
                alert("Please upload a company logo")
                return
            }

            // Step 1: ImgBB তে logo upload করো
            const base64Image = formData.logoPreview.split(",")[1]
            const imgData = new FormData()
            imgData.append("image", base64Image)

            const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                method: "POST",
                body: imgData
            })
            const imgJson = await imgRes.json()

            if (!imgJson.success) {
                alert("Logo upload failed!")
                return
            }

            const logoURL = imgJson.data.url
            console.log("✅ Logo URL:", logoURL)

            // Step 2: logoPreview বাদ দিয়ে logoURL যোগ করো
            const { logoPreview, ...jobData } = formData
            const finalData = { ...jobData, logoURL }

            console.log("🚀 Final data sending:", finalData)

            // Step 3: Server Action call করো
            const res = await createJob(finalData)
            console.log(res)

            if (res.insertedId) {
                alert("✅ Job posted successfully!")
            } else {
                alert("❌ Failed to post job")
            }
        } catch (error) {
            console.error("❌ Error posting job:", error)
            alert(error.message || "Something went wrong.")
        }
    }

    return (
        <div className="min-h-screen bg-transparent px-6 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Post a New Job</h1>
                    <p className="text-gray-400">Fill in the details below to post a job opening</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ========== JOB INFO SECTION ========== */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Job Information</h2>

                        <div className="space-y-6">
                            {/* Job Title */}
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-semibold text-white mb-2">
                                    Job Title *
                                </label>
                                <input
                                    id="jobTitle"
                                    type="text"
                                    name="jobTitle"
                                    placeholder="e.g., Senior Frontend Developer"
                                    value={formData.jobTitle}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors"
                                />
                            </div>

                            {/* Job Category & Currency */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="jobCategory"
                                        className="block text-sm font-semibold text-white mb-2"
                                    >
                                        Job Category *
                                    </label>
                                    <select
                                        id="jobCategory"
                                        name="jobCategory"
                                        value={formData.jobCategory}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="frontend">Frontend Development</option>
                                        <option value="backend">Backend Development</option>
                                        <option value="fullstack">Full Stack Development</option>
                                        <option value="devops">DevOps</option>
                                        <option value="design">UI/UX Design</option>
                                        <option value="product">Product Management</option>
                                        <option value="sales">Sales</option>
                                        <option value="marketing">Marketing</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="currency" className="block text-sm font-semibold text-white mb-2">
                                        Currency *
                                    </label>
                                    <select
                                        id="currency"
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="INR">INR</option>
                                        <option value="PKR">PKR</option>
                                        <option value="CAD">CAD</option>
                                    </select>
                                </div>
                            </div>

                            {/* Job Type Checkboxes */}
                            <div>
                                <label className="block text-sm font-semibold text-white mb-3">Job Type *</label>
                                <div className="flex flex-wrap gap-4">
                                    {["Full-time", "Part-time", "Remote", "Contract", "Internship"].map((type) => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.jobType.includes(type)}
                                                onChange={() => handleJobTypeChange(type)}
                                                className="w-4 h-4 rounded bg-gray-800 border border-gray-700 cursor-pointer accent-blue-500"
                                            />
                                            <span className="text-gray-300">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Salary Range */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="salaryMin" className="block text-sm font-semibold text-white mb-2">
                                        Minimum Salary *
                                    </label>
                                    <input
                                        id="salaryMin"
                                        type="number"
                                        name="salaryMin"
                                        placeholder="e.g., 50000"
                                        value={formData.salaryMin}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="salaryMax" className="block text-sm font-semibold text-white mb-2">
                                        Maximum Salary *
                                    </label>
                                    <input
                                        id="salaryMax"
                                        type="number"
                                        name="salaryMax"
                                        placeholder="e.g., 100000"
                                        value={formData.salaryMax}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-semibold text-white mb-2">
                                        City {formData.isRemote && <span className="text-gray-500">(Optional)</span>}
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="city"
                                        placeholder="e.g., San Francisco"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        disabled={formData.isRemote}
                                        className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors disabled:opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-semibold text-white mb-2">
                                        Country {formData.isRemote && <span className="text-gray-500">(Optional)</span>}
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        name="country"
                                        placeholder="e.g., United States"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        disabled={formData.isRemote}
                                        className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            {/* Remote Toggle */}
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isRemote}
                                        onChange={handleRemoteToggle}
                                        className="w-5 h-5 rounded bg-gray-800 border border-gray-700 cursor-pointer accent-blue-500"
                                    />
                                    <span className="text-sm font-semibold text-white">This is a Remote Position</span>
                                </label>
                            </div>

                            {/* Deadline */}
                            <div>
                                <label htmlFor="deadline" className="block text-sm font-semibold text-white mb-2">
                                    Application Deadline *
                                </label>
                                <input
                                    id="deadline"
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ========== JOB DESCRIPTION SECTION ========== */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Job Description</h2>

                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="responsibilities"
                                    className="block text-sm font-semibold text-white mb-2"
                                >
                                    Responsibilities *
                                </label>
                                <textarea
                                    id="responsibilities"
                                    name="responsibilities"
                                    placeholder="Enter key responsibilities (one per line or bullet points)"
                                    value={formData.responsibilities}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label htmlFor="requirements" className="block text-sm font-semibold text-white mb-2">
                                    Requirements *
                                </label>
                                <textarea
                                    id="requirements"
                                    name="requirements"
                                    placeholder="Enter required skills and qualifications (one per line or bullet points)"
                                    value={formData.requirements}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label htmlFor="benefits" className="block text-sm font-semibold text-white mb-2">
                                    Benefits <span className="text-gray-500 text-xs">(Optional)</span>
                                </label>
                                <textarea
                                    id="benefits"
                                    name="benefits"
                                    placeholder="Enter benefits offered (health insurance, remote work, stock options, etc.)"
                                    value={formData.benefits}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ========== COMPANY SECTION ========== */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Company Information</h2>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
                                    Select Company *
                                </label>
                                <select
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-800 border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 text-white transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="">Select a company</option>
                                    <option value="acme">Acme Corporation</option>
                                    <option value="techcorp">TechCorp Inc</option>
                                    <option value="innovate">Innovate Studios</option>
                                    <option value="digital">Digital Solutions</option>
                                </select>
                            </div>

                            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                                <p className="text-sm text-gray-400 mb-4">
                                    💡 <strong>Tip:</strong> Only companies approved by HireLoop can post jobs. Your
                                    posting limit depends on your plan:
                                </p>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>
                                        ✓ <strong>Free Plan:</strong> 3 active job posts
                                    </li>
                                    <li>
                                        ✓ <strong>Growth Plan:</strong> 10 active job posts
                                    </li>
                                    <li>
                                        ✓ <strong>Enterprise Plan:</strong> 50 active job posts
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Company Logo <span className="text-gray-500 text-xs">(Optional)</span>
                                </label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <label className="flex-1">
                                        <div className="bg-gray-800 border-2 border-dashed border-gray-700 hover:border-gray-600 rounded-lg p-8 cursor-pointer transition-colors flex flex-col items-center justify-center">
                                            <ArrowShapeUpFromLine size={24} className="text-gray-500 mb-2" />
                                            <span className="text-sm text-gray-400">Click to upload</span>
                                            <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </label>

                                    {/* ✅ UPDATED: Use formData.logoPreview */}
                                    {formData.logoPreview && (
                                        <div className="relative w-32 h-32">
                                            <img
                                                src={formData.logoPreview}
                                                alt="Logo Preview"
                                                className="w-full h-full object-cover rounded-lg border border-gray-700"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        logoPreview: null
                                                    }))
                                                }
                                                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
                                            >
                                                <Xmark size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========== SUBMIT SECTION ========== */}
                    <div className="flex gap-4 pt-8">
                        <button
                            type="button"
                            className="flex-1 px-8 py-3 rounded-lg border border-gray-700 text-gray-300 font-semibold hover:border-gray-600 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                        >
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
