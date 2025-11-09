import emailIcon from '../assets/icons/mail.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import githubIcon from '../assets/icons/github.png';
import phoneIcon from '../assets/icons/telephone.png';
import webIcon from '../assets/icons/web.png';

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

export default contacts;