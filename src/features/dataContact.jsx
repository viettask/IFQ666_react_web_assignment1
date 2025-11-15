// Importing icon images for each contact method
import emailIcon from '../assets/icons/mail.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import githubIcon from '../assets/icons/github.png';
import phoneIcon from '../assets/icons/telephone.png';
import webIcon from '../assets/icons/web.png';


/**
 * contacts Array
 *
 * Purpose:
 * This array stores all the contact methods for a user, along with relevant details.
 * Each item in the array represents a single contact method.
 *
 * Structure of each contact object:
 * - id: Unique identifier for the contact (used as React key when rendering lists)
 * - method: The type of contact (e.g., email, LinkedIn, GitHub, phone, website)
 * - icon: The imported image icon representing the contact method
 * - link: The URL or protocol link for the contact
 *         Examples:
 *           - "mailto:..." for email
 *           - "tel:..." for phone
 *           - "https://..." for website or social profile
 * - value: The visible text or value to display in the UI (e.g., email address, phone number, username)
 *
 * Usage:
 * This array can be mapped over in a React component to dynamically generate contact cards or links.
 * For example, a "Contact" section can render each item with its icon, clickable link, and display value.
 */
const contacts = [
  {
    id: 1,
    method: 'email',
    icon: emailIcon,
    link: 'mailto:viet.nguyen@viettask.com',
    value: 'viet.nguyen@viettask.com'
  },
  {
    id: 2,
    method: 'linkedIn',
    icon: linkedinIcon,
    link: 'https://www.linkedin.com/in/viethuynhnguyen',
    value: 'viethuynhnguyen'
  },
  {
    id: 3,
    method: 'github',
    icon: githubIcon,
    link: 'https://github.com/viettask',
    value: 'https://github.com/viettask'
  },
  {
    id: 4,
    method: 'phone',
    icon: phoneIcon,
    link: "tel:+610450345478",
    value: '(+61) 0450 345 478'
  },
  {
    id: 5,
    method: 'web',
    icon: webIcon,
    link: 'https://viettask.com',
    value: 'https://viettask.com'
  }
];


// Export the array for use in other components
export default contacts;