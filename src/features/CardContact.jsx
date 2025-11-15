import React from 'react';
// Import the contact data from a local file
// Each item in this data array represents a contact method (email, phone, LinkedIn, etc.)
import data from '../features/dataContact.jsx';
import './CardContact.css';                           // Import CSS file for styling the contact cards

/**
 * CardContact Component
 *
 * Purpose:
 * This component renders a list of contact methods dynamically from
 * the `data` array. Each contact item displays an icon and a link/value.
 *
 * Structure:
 * - Outer container: div with class "contact-list"
 * - Inner items: div with class "contact-item" for each contact
 *   - Icon: <img> element with alt text as the contact method
 *   - Value: <a> element linking to the contact's URL or action
 *
 * Key Points:
 * - The 'key' prop uses the unique `id` from each contact object
 *   to ensure React can efficiently update/re-render the list.
 * - The component is fully dynamic, so adding or removing
 *   contacts in `dataContact.jsx` automatically updates the UI.
 */
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
// Export the component so it can be used in other parts of the app
export default CardContact;
