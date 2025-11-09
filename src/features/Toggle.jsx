import React, { useState } from "react";
import "./Toggle.css";

function Toggle() {
  const [on, setOn] = useState(false);
  const handleToggle = () => {
    setOn(!on);
  };

  return (
    <div>
      <div
        className={`toggle ${on ? "active" : ""}`}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleToggle(); } }}
        aria-pressed={on}
        aria-label={on ? 'Turn off' : 'Turn on'}
      >
        <div className={`spinner ${on ? "active" : ""}`}></div>
      </div>
    </div>
  );
}

export default Toggle;