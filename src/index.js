// Import React library to use JSX and React components
import React from 'react';

// Import ReactDOM for rendering the React app into the DOM
// Using `react-dom/client` for React 18+ createRoot API
import ReactDOM from 'react-dom/client';

// Import Bootstrap CSS for global styling and pre-built components
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the root App component which contains the entire application
import App from './App';

// Import performance reporting utility to measure web vitals (optional)
import reportWebVitals from './reportWebVitals';


// Get the root DOM node where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React app inside the root node
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
