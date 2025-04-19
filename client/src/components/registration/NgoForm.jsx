import { useState } from "react"
import { LuArrowLeft, LuUpload, LuLoader } from "react-icons/lu"
import axios from "axios"
import ImageUpload from "../shared/ImageUpload"
import Loader from "../shared/Loader"

export default function NgoForm({ onBack }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [loading ,setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Organization Information
    ngoName: "",
    ngoType: "",
    registrationNumber: "",
    yearEstablished: "",
    website: "",


    // Authorized Person Details
    fullName: "",
    email: "",
    password: "",
    phone: "",
    alternatePhone: "",
    designation: "",

    // Address
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",

    // Operational Details
    areasServed: "",
    operatingHours: "",
    daysAvailable: "",
    canPickup: false,

    // Documents
    registrationCertificate: "",
    addressProof: "",

    agreeTerms: false,
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


  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Organization Information validation
    // if (!formData.ngoName.trim()) newErrors.ngoName = "NGO name is required"
    // if (!formData.ngoType.trim()) newErrors.ngoType = "NGO type is required"
    // if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required"

    // // Authorized Person validation
    // if (!formData.fullName.trim()) {
    //   newErrors.fullName = "Full name is required"
    //   return false;
    // }
    // if (!formData.email.trim()) {
    //   newErrors.email = "Email is required"
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Email is invalid"
    // }
    // if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    // if (!formData.designation.trim()) newErrors.designation = "Designation is required"
    // validate password
    if (!formData.password.trim()) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long"

    // Address validation
    // if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required"
    // if (!formData.city.trim()) newErrors.city = "City is required"
    // if (!formData.state.trim()) newErrors.state = "State is required"
    // if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"

    // Operational Details validation
    // if (!formData.areasServed.trim()) newErrors.areasServed = "Areas served is required"
    // if (!formData.operatingHours.trim()) newErrors.operatingHours = "Operating hours is required"
    // if (formData.daysAvailable.length === 0) newErrors.daysAvailable = "At least one day must be selected"

    // Document validation
    if (!formData.registrationCertificate) newErrors.registrationCertificate = "Registration certificate is required"
    if (!formData.addressProof) newErrors.addressProof = "Address proof is required"

    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")


    if (!validateForm()) return

    setLoading(true);

    try {
      // In a real app, replace with your actual API endpoint
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/register/ngo`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("NGO Registration successful:", response.data)
      setSubmitSuccess(true)

      // In a real app, you might redirect the user or show a success message
    } catch (error) {
      console.error("Registration failed:", error)
      setSubmitError("Registration failed. Please try again later.")
    } finally {
      setIsSubmitting(false)
      setLoading(false);
    }
  }

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
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
        <p className="text-gray-600 mb-6">Your NGO account has been created successfully.</p>
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

      <h2 className="text-xl font-semibold mb-6">NGO Registration</h2>

      {submitError && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">{submitError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Organization Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Organization Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ngoName" className="block text-sm font-medium text-gray-700 mb-1">
                  NGO Name *
                </label>
                <input
                  required
                  type="text"
                  id="ngoName"
                  name="ngoName"
                  value={formData.ngoName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.ngoName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.ngoName && <p className="text-red-500 text-xs mt-1">{errors.ngoName}</p>}
              </div>

              <div>
                <label htmlFor="ngoType" className="block text-sm font-medium text-gray-700 mb-1">
                  NGO Type *
                </label>
                <select
                  required
                  id="ngoType"
                  name="ngoType"
                  value={formData.ngoType}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.ngoType ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select NGO Type</option>
                  <option value="Food Bank">Food Bank</option>
                  <option value="Shelter Home">Shelter Home</option>
                  <option value="Community Kitchen">Community Kitchen</option>
                  <option value="Orphanage">Orphanage</option>
                  <option value="Other">Other</option>
                </select>
                {errors.ngoType && <p className="text-red-500 text-xs mt-1">{errors.ngoType}</p>}
              </div>

              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number / NGO ID *
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  required
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.registrationNumber ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
              </div>

              <div>
                <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Establishment *
                </label>
                <input
                  type="number"
                  required
                  id="yearEstablished"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className={`w-full px-3 py-2 border rounded-md ${errors.yearEstablished ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.yearEstablished && <p className="text-red-500 text-xs mt-1">{errors.yearEstablished}</p>}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website (optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://example.org"
                />
              </div>
            </div>
          </div>

          {/* Authorized Person Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Authorized Person Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
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
                  required
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Alternate Contact Number (optional)
                </label>
                <input
                  type="tel"
                  id="alternatePhone"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                  Designation (Founder, Coordinator, etc.) *
                </label>
                <input
                  type="text"
                  required
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.designation ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-medium mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <textarea
                  id="streetAddress"
                  name="streetAddress"  
                  required
                  rows={2}
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.streetAddress ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.city ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.state ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>

              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  required
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Operational Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Operational Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="areasServed" className="block text-sm font-medium text-gray-700 mb-1">
                  Areas Served (Localities or Regions) *
                </label>
                <textarea
                  id="areasServed"
                  name="areasServed"
                  rows={2}
                  value={formData.areasServed}
                  required
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.areasServed ? "border-red-500" : "border-gray-300"}`}
                  placeholder="E.g., Downtown, North Side, West District"
                />
                {errors.areasServed && <p className="text-red-500 text-xs mt-1">{errors.areasServed}</p>}
              </div>

              <div>
                <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700 mb-1">
                  Operating Hours (e.g., 9AM-6PM) *
                </label>
                <input
                  type="text"
                  required
                  id="operatingHours"
                  name="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.operatingHours ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.operatingHours && <p className="text-red-500 text-xs mt-1">{errors.operatingHours}</p>}
              </div>

              <div>
                <label htmlFor="daysAvailable" className="block text-sm font-medium text-gray-700 mb-1">
                  Days Available for Pickup (e.g., Mon-Sat) *
                </label>
                <input
                  type="text"
                  id="daysAvailable"
                  name="daysAvailable"
                  value={formData.daysAvailable}
                  required
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.daysAvailable ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.daysAvailable && <p className="text-red-500 text-xs mt-1">{errors.daysAvailable}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Can You Pick Up Donations? *</label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="canPickup"
                      checked={formData.canPickup}
                      required
                      onChange={() => setFormData({ ...formData, canPickup: true })}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="canPickup"
                      checked={!formData.canPickup}
                      required
                      onChange={() => setFormData({ ...formData, canPickup: false })}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <h3 className="text-lg font-medium mb-4">Document Upload</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUpload title={"Registration Certificate (Image) *"} onUpload={(url) => setFormData({ ...formData, registrationCertificate: url })} />

              <ImageUpload title={"Address Proof (Image) *"} onUpload={(url) => setFormData({ ...formData, addressProof: url })} />

            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                required
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                I agree to the Terms & Conditions and confirm that the above information is accurate.
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center"
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
