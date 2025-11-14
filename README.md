# IFQ666 React Web Assignment 1

## Purpose

- This application is a React‑based web project created to fulfil the requirements of Assignment 1 for the IFQ666 course.
- It serves as a portfolio to showcase a developer’s resume, skills, projects, and experience in a visually appealing and user-friendly way, demonstrating both design and technical capabilities using React.

## Contributing

Contributions from other developers who want to improve IFQ666 are welcome! 
Follow these steps to contribute effectively:

1. Fork the repository.
   Click the Fork button on Github to create your own copy of the project

2. Clone your fork
      ```bash
   git clone https://github.com/viettask/IFQ666_react_web_assignment1.git
   ```
   
3. Create a new branch for your feature or fix:
      ```bash
   git checkout -b feature-or-fix-name
   ```
      
4. Make your changes, and commit them with a meaningful message:
   Update README.md if needed
      ```bash
   git commit -m "Add <feature>/Fix <issue>"
   ```

5. Push your branch to your fork:
      ```bash
   git push origin feature-or-fix-name
   ```

6. Open a Pull Request (PR) against the main repository. The repository owner will review and merge once approved.

## Features

1. Basic create-react-app setup with a focus on the assignment requirements.

2. Responsive Design: The website adapts to all screen sizes, ensuring an optimal user experience on both desktop and mobile devices.

3. Header with navigation bar menu: A simple and accessible menu allowing users to navigate between pages such as Home, About, Resume, Portfolio, Search, and Photos.

4. Footer: A consistent footer across all pages with email contact and legal information.

5. Pages:

   - Home Page: Includes a hero image and introduction text.

   - About Page: Personal information.

   - Resume Page: Displays a professional summary, career history, skills, and qualifications.

   - Portfolio Page: Showcases projects and creations, populated from Github API.

## Technologies Used
1. Frontend Framework
   - React 18 - Component based UI development
   - React Router DOM 17 - Client-side routing for multiple pages

2. Styling & UI
   - Bootstrap 5 - layout and pre-built components
   - Lucide React - Modern SVG icons
     
   - HTML/CSS
- Javascript (ES6)
- Bootstrap
- axios

## Repository Structure
 ```bash
.
├── assets
│   ├── icons
│   │   ├── github.png
│   │   ├── linkedin.png
│   │   ├── mail.png
│   │   ├── telephone.png
│   │   └── web.png
│   └── henry_cookie.jfif
├── features
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── CardContact.css
│   ├── CardContact.jsx
│   ├── CardContent.jsx
│   ├── dataContact.jsx
│   ├── dataResume.jsx
│   ├── GeoSearchGoogleMap.jsx
│   ├── LikeCounter.css
│   ├── LikeCounter.jsx
│   ├── NavBar.jsx
│   ├── Toggle.css
│   └── Toggle.jsx
├── pages
│   ├── About.js
│   ├── Home.css
│   ├── Home.js
│   ├── Portfolio.css
│   ├── Portfolio.js
│   └── Resume.js
├── App.css
├── App.js
├── ErrorBoundary.js
├── GitHubRepos.css
├── GitHubRepos.js
├── index.css
├── index.js
└── reportWebVitals.js
```

## Project Setup

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/viettask/IFQ666_react_web_assignment1.git
   ```

2. Navigate into the project directory:
   ```bash
   cd IFQ666_react_web_assignment1
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the project:
   ```bash
   npm start
   ```

## Acknowledgements
- Google Maps JavaScript API
- React documentation
- Bootstrap & Tailwind CSS documentation
- Online public APIs for project data

## License

This project is licensed under the MIT License.
