import React from 'react';
import data from '../features/dataContact.jsx';
import './CardContact.css';

function CardContact() {

    return (
    <div className="contact-list">
      {data.map(({ id, method, icon, link, value }, index) => (
        <div key={id} className="contact-item">
          <img src={icon} alt={method} className="contact-icon me-2" />
          <span><a href={link} className="">{value}</a></span>
        </div>
      ))}
    </div>
    );
}

export default CardContact;
