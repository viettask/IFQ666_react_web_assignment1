import React, { useState } from "react";          // Import React and useState hook
import "./Toggle.css";                            // Import CSS styles for the toggle switch


// Toggle component accepts a callback prop `onToggle` to notify parent of state changes
function Toggle({ onToggle }) {
  // ---------------------------
  // State: Track toggle on/off
  // ---------------------------
  const [on, setOn] = useState(false);
  // ---------------------------
  // Handler: Toggle state
  // ---------------------------
  const handleToggle = () => {
    const newState = !on;                         // Compute the opposite state
    setOn(newState);                              // Update internal state

    //Notify parent component of the toggle state change
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div>
      {/* ---------------------------
          Toggle container
          ---------------------------
          - Clickable div styled with CSS class `toggle`
          - Conditionally add "active" class when `on` is true
          - Accessible: role, keyboard events, ARIA attributes
      --------------------------- */}
      <div
        className={`toggle ${on ? "active" : ""}`}          // Conditional class
        onClick={handleToggle}                              // Toggle state on click
        role="button"                                       // Accessibility: treat div as a button
        tabIndex={0}                                        // Make div focusable for keyboard navigation
        // Handle keyboard events
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleToggle(); } }}
        aria-pressed={on}                                   // ARIA attribute to indicate toggle state
        aria-label={on ? 'Turn off' : 'Turn on'}            // ARIA label for screen readers
      >

        {/* ---------------------------
            Spinner / knob inside toggle
            - Moves left/right depending on toggle state
            - Uses `active` class for CSS transitions
        --------------------------- */}
        <div className={`spinner ${on ? "active" : ""}`}></div>
      </div>
    </div>
  );
}
// Export component for use in other parts of the app
export default Toggle;