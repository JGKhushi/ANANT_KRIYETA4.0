import { useState } from "react"
import { LuArrowLeft, LuUpload, LuLoader } from "react-icons/lu"
import axios from "axios"
import ImageUpload from "../shared/ImageUpload"

export default function UserBusinessForm({ onBack }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isBusiness, setIsBusiness] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    businessName: "",
    businessType: "",
    yearEstablished: "",
    fssaiNumber: "",
    gstNumber: "",
    contactPersonName: "",
    contactDesignation: "",
    contactPhone: "",
    businessEmail: "",
    fssaiCertificate: "",
    addressProof: "",
    safetyAudit: "",
    role: "USER",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = e.target.checked
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target
  //   if (files && files.length > 0) {
  //     setImages({ ...images, [name]: files[0] })
  //   }
  // }

  // const handleImageUpload = async (e) => {
  //   const imageFormData = new FormData()
  //   if(images.fssaiCertificate) {
  //     imageFormData.append("fssaiCertificate", images.fssaiCertificate)
  //   }

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/upload", imageFormData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })

  //     const imageUrl = res.data.fileUrl;
  //     setFormData((prevData) => ({ ...prevData, fssaiCertificate: imageUrl }))

  //   } catch (error) {
  //     console.error("Error uploading image:", error)
  //   }
  // }

  const validateForm = () => {
    const newErrors = {}

    // Basic validation
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.address.trim()) newErrors.address = "Address is required"

    // Business validation
    if (isBusiness) {

      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required"
      if (!formData.businessType) newErrors.businessType = "Business type is required"
      if (!formData.fssaiNumber.trim()) newErrors.fssaiNumber = "FSSAI license number is required"
      if (!formData.contactPersonName.trim()) newErrors.contactPersonName = "Contact person name is required"
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setFormData((prevData) => ({ ...prevData, role: "BUSINESS" }))

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")

    const userData = {...formData}
    delete userData.confirmPassword

    try {
      // In a real app, replace with your actual API endpoint
      const url = `${import.meta.env.VITE_BACKEND}/auth/register`
      const response = await axios.post(url, userData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })

      console.log("Registration successful:", response.data)
      setSubmitSuccess(true)

      // In a real app, you might redirect the user or show a success message
    } catch (error) {
      console.error("Registration failed:", error.message)
      setSubmitError("Registration failed. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
        <a
          href="/login"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Proceed to Login
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-orange-500 mb-6">
        <LuArrowLeft className="mr-1" /> Back to selection
      </button>

      {submitError && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">{submitError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.address ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Business Selection */}
          <div>
            <div className="flex items-center mb-4">
              <label className="mr-4 text-sm font-medium text-gray-700">Are you a business?</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="businessType"
                    checked={isBusiness}
                    onChange={() => setIsBusiness(true)}
                    className="form-radio text-orange-500"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="businessType"
                    checked={!isBusiness}
                    onChange={() => setIsBusiness(false)}
                    className="form-radio text-orange-500"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Business Information (conditional) */}
          {isBusiness && (
            <div>
              <h3 className="text-lg font-medium mb-4">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.businessName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.businessType ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select Business Type</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Grocery Store">Grocery Store</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
                </div>

                <div>
                  <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Establishment (optional)
                  </label>
                  <input
                    type="number"
                    id="yearEstablished"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="fssaiNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    FSSAI License Number *
                  </label>
                  <input
                    type="text"
                    id="fssaiNumber"
                    name="fssaiNumber"
                    value={formData.fssaiNumber}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.fssaiNumber ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.fssaiNumber && <p className="text-red-500 text-xs mt-1">{errors.fssaiNumber}</p>}
                </div>

                <div>
                  <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    GST Number (optional)
                  </label>
                  <input
                    type="text"
                    id="gstNumber"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <h4 className="text-md font-medium mt-4 mb-3">Point of Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactPersonName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person Full Name *
                  </label>
                  <input
                    type="text"
                    id="contactPersonName"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.contactPersonName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.contactPersonName && <p className="text-red-500 text-xs mt-1">{errors.contactPersonName}</p>}
                </div>

                <div>
                  <label htmlFor="contactDesignation" className="block text-sm font-medium text-gray-700 mb-1">
                    Designation (e.g., Manager, Supervisor)
                  </label>
                  <input
                    type="text"
                    id="contactDesignation"
                    name="contactDesignation"
                    value={formData.contactDesignation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Alternate Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Email (if different)
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <h4 className="text-md font-medium mt-4 mb-3">Document Upload</h4>
              <ImageUpload title={"Upload FSSAI Certificate (Image) *"} onUpload={(imageUrl) => {
                setFormData((prevData) => ({ ...prevData, fssaiCertificate: imageUrl }))
              }}/>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                I agree to the Terms & Conditions and pledge to donate responsibly.
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 w-full  hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition-colors flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <LuLoader className="animate-spin mr-2" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
