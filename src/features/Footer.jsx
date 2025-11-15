import React from 'react';
import emailIcon from '../assets/icons/mail.png';   // Importing an email icon image

/**
 * Footer Component
 *
 * Purpose:
 * This component renders a website footer containing copyright information
 * and contact details (email in this case). It is meant to be displayed
 * at the bottom of a web page.
 *
 * Features:
 * 1. Displays copyright information.
 * 2. Provides an email contact with an icon.
 * 3. Can be reused across multiple pages.
 */
function Footer() {
    return (
        <div className="footer">
            <p>© 2025 Viet Nguyen. All rights reserved.</p>
            <p>
                <img src={emailIcon} alt="email" className="contact-icon me-2" />
                <a href="mailto:viet.nguyen@viettask.com">viet.nguyen@viettask.com</a>
            </p>
        </div>
    );
}

// Exporting Footer component for use in other parts of the app
export default Footer;