import React, { useEffect, useState } from "react";
import { Link , useLocation} from 'react-router-dom';
import Toggle from './Toggle';

function NavBar() {
    // Get the current location from react-router
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);

    // Apply dark mode to bottom section only
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

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
            <header className="App-header">
                <nav className="App-nav">
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                                {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Toggle onToggle={handleToggle} />
            </header>
        </div>
    )
}

export default NavBar;
