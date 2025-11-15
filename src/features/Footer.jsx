import React from 'react';
import emailIcon from '../assets/icons/mail.png';

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

export default Footer;