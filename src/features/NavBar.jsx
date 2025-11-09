import React from 'react';
import { Link , useLocation} from 'react-router-dom';
import Toggle from './Toggle';

function NavBar() {
    // Get the current location from react-router
    const location = useLocation();

    // Array of nav items with the link text and path
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Resume', path: '/resume' },
        { name: 'Portfolio', path: '/portfolio' }
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
                <Toggle />
            </header>
        </div>
    )
}

export default NavBar;
