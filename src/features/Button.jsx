import React from 'react'

/**
 * Reusable Button Component
 *
 * Props:
 * - children: The content inside the button (text, icons, etc.)
 * - onClick:   Function that runs when the button is clicked
 * - type:      Button type attribute (default: "button")
 * - className: Additional custom CSS classes provided by the parent
 */
function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      // HTML button type (e.g., "button", "submit", "reset")
      type={type}
      // Event handler triggered when the user clicks the button
      onClick={onClick}
      // Default Tailwind styles + allow custom classes passed from parent
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none ${className}`}
    >{/* Render any child content passed to the component */}
      {children}
    </button>
  )
}
// Export the component so it can be used in other parts of the app
export default Button
