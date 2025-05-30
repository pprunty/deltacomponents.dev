"use client"

import React, { useState } from "react"

interface StarRatingProps {
  initialValue?: number // Initial rating value (optional)
  onChange?: (value: number) => void // Callback when rating changes (optional)
  locked?: boolean // Whether the rating is locked (default: true)
  showScore?: boolean // Show score in brackets (e.g., 4.2/5)
}

const StarRating: React.FC<StarRatingProps> = ({
  initialValue = 0,
  onChange,
  locked = true, // Default to locked
  showScore = false,
}) => {
  const [rating, setRating] = useState(initialValue)
  const roundedScore = Math.round((rating + Number.EPSILON) * 10) / 10

  const handleClick = (value: number) => {
    if (!locked) {
      setRating(value)
      if (onChange) {
        onChange(value)
      }
    }
  }

  // Calculate fill for each star
  const getFill = (index: number) => {
    if (index <= Math.floor(rating)) return 1
    if (index === Math.ceil(rating) && rating % 1 !== 0) return rating % 1
    return 0
  }

  // Generate unique ID for this star rating instance
  const instanceId = React.useId()

  return (
    <div className="flex items-center py-2">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          fill={getFill(index)}
          onClick={() => handleClick(index)}
          locked={locked}
          starIndex={index}
          instanceId={instanceId}
        />
      ))}
      {showScore && (
        <span className="ml-2 text-sm text-muted-foreground">
          ({roundedScore}/5)
        </span>
      )}
    </div>
  )
}

interface StarProps {
  fill: number // 0 to 1, how much of the star is filled
  onClick: () => void
  locked: boolean
  starIndex: number
  instanceId: string
}

const Star: React.FC<StarProps> = ({
  fill,
  onClick,
  locked,
  starIndex,
  instanceId,
}) => {
  const gradientId = `star-gradient-${instanceId}-${starIndex}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      width="20px"
      viewBox="0 0 47.94 47.94"
      className="mr-2"
      onClick={!locked ? onClick : undefined}
      style={{ cursor: locked ? "default" : "pointer" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${fill * 100}%`} stopColor="#ED8A19" />
          <stop offset={`${fill * 100}%`} stopColor="#D3D3D3" />
        </linearGradient>
      </defs>
      <path
        style={{
          fill: `url(#${gradientId})`,
          transition: "fill 0.3s ease-in-out",
        }}
        d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z"
      />
    </svg>
  )
}

export default StarRating
