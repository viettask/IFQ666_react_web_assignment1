import React from 'react'


/**
 * Reusable Card Component
 *
 * Props:
 * - children:  Any React elements passed inside the <Card> ... </Card>
 * - className: Optional extra CSS classes for custom styling
 *
 * Purpose:
 * This component provides a consistent Card UI container with padding,
 * rounded corners, shadow, and a white background. It helps standardize
 * UI sections throughout the application.
 */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow p-4 ${className}`}>
      {/* Render all inner content provided to the card */}
      {children}
    </div>
  )
}
// Export the component so it can be used in other parts of the app
export default Card;