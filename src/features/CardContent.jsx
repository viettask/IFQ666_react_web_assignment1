import React from 'react'

/**
 * CardContent Component
 *
 * Purpose:
 * This component is a flexible container for the content inside a Card.
 * It ensures a vertical layout and consistent spacing between child elements.
 *
 * Props:
 * - children: The content elements (e.g., text, images, links) that will be rendered inside the container.
 * - className (optional): Additional CSS classes that can be passed to customize styling.
 *
 * Structure:
 * - Outer container: <div> element
 *   - CSS classes:
 *     - "flex flex-col": Arranges children vertically
 *     - "space-y-1": Adds consistent vertical spacing between children
 *     - `${className}`: Allows additional classes to be passed in for customization
 * - Renders the `children` prop inside the container
 *
 * Usage:
 * Wrap any content inside <CardContent> within a <Card> or standalone to maintain consistent spacing and layout.
 */
function CardContent({ children, className = "" }) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {children}
    </div>
  )
}

// Export the component so it can be reused in other parts of the app
export default CardContent;