import React from 'react'

function CardContent({ children, className = "" }) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {children}
    </div>
  )
}

export default CardContent;