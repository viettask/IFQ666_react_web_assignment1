import React, { useEffect, useState } from "react";             // Import React and hooks
import { Link, useLocation } from 'react-router-dom';           // Import Link for navigation and useLocation to track current URL
import Toggle from './Toggle';                                  // Import custom Toggle component for dark mode switch


// NavBar component renders the main navigation menu
function NavBar() {
    // Get the current location from react-router
    const location = useLocation();
    // State to track whether dark mode is enabled
    const [darkMode, setDarkMode] = useState(false);

    // Apply dark mode to bottom section only
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");       // Add dark mode styling
        } else {
            document.body.classList.remove("dark-mode");    // Remove dark mode styling
        }
    }, [darkMode]); // Runs every time darkMode changes


    // Callback function to handle toggle from the Toggle component
    const handleToggle = (newState) => {
        setDarkMode(newState); // Update dark mode state
    };

    // Array of nav items with the link text and path
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Resume', path: '/resume' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Search', path: '/search' },
        { name: 'Photos', path: '/photos' }
    ];

    return (
        <div>
            {/* Header section containing navigation and dark mode toggle */}
            <header className="App-header">
                {/* Navigation menu */}
                <nav className="App-nav">
                    <ul>
                        {/* Render each nav item */}
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Toggle component for dark mode */}
                <Toggle onToggle={handleToggle} />
            </header>
        </div>
    )
}

// Export component to be used in other parts of the app
export default NavBar;
