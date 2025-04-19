import { useState } from "react"
import axios from "axios"

export default function ImageUpload({title, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleUpload = async () => {
    setUploading(true)
    if (!image) {
      setUploading(false)
      setError("* Please select a file to upload.")
      return;
    }
    const formData = new FormData()
    formData.append("file", image)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setMsg("File uploaded successfully.")
      const fileUrl = response.data.fileUrl
      onUpload(fileUrl);
    } catch (error) {
      setError("* Error uploading file. Please try again.")
      console.error("Error uploading file:", error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">
            { title }
          </div>
          <div className="flex items-center mt-1">
            <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              {/* <LuUpload className="mr-2" /> */}
              {image ? image.name : "Choose file"}
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
                className="sr-only"
                required
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="mt-4 max-w-[100px] inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          {uploading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
            </svg>
          ) : null}
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {msg && <p className="text-green-500 text-sm mt-2">{msg}</p>}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

    </>
  )
}
