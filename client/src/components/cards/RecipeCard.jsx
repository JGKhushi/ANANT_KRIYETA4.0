import React from 'react'
import image from '../../assets/home-page/food1.webp'

export default function RecipeCard({ title, setOpen }) {
  return (
    <div className="overflow-hidden max-w-[280px] rounded-md shadow-md bg-white ">
      <div className="rounded-lg overflow-hidden mb-3">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-32 object-cover"
        />
      </div>
      <h3 className="px-2 font-medium text-gray-900 mb-1">{title}</h3>

      <div className="px-2 mb-2 flex justify-between items-center ">
        <span onClick={() => setOpen(true)} className="text-green-600 cursor-pointer hover:text-green-700 text-sm font-medium">
          View Recipe
        </span>
      </div>
    </div>
  )
}
