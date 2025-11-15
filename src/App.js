import './App.css';                                                                     // Import global CSS styles
import React from 'react';                                                              // Import React library               
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';               // Import Router components for navigation
import Home from './pages/Home';                                                        // Import Home page component                       
import About from './pages/About';                                                      // Import About page component                   
import Resume from './pages/Resume';                                                    // Import Resume page component                 
import Portfolio from './pages/Portfolio';                                              // Import Portfolio page component                    
//import ErrorBoundary from './ErrorBoundary';                                                 
import NavBar from './features/NavBar';                                                 // Import NavBar component for site navigation             
import Footer from './features/Footer';                                                 // Import Footer component for site footer               
import Search from './pages/Search';                                                    // Import Search page component     
import Photos from './pages/Photos';                                                    // Import Photos page component 

// Main App component
function App() {


  // ---------------------------
  // Site owner data
  // ---------------------------
  const siteOwner = {
    name: 'Viet Nguyen',
    intro: "A full-stack developer specializing in scalable web applications, cloud solutions and data.",
    githubUsername: 'viettask'
  };

  return (
    <div>
      {/* Router wraps the entire application for routing support */}
      <Router>
        <div className="App">
          {/* ---------------------------
              Header Section
              ---------------------------
              Contains navigation bar at the top of the page
          --------------------------- */}
          <header >
            <NavBar className="App-header" />
          </header>



          {/* ---------------------------
              Main Content Section
              ---------------------------
              Routes are wrapped with ErrorBoundary to catch runtime errors in child components
          --------------------------- */}
          <main className="App-main">
            {/* <ErrorBoundary> */}
            <Routes>
              {/* Define individual routes */}
              <Route path="/" element={<Home name={siteOwner.name} intro={siteOwner.intro} />} />
              <Route path="/about" element={<About name={siteOwner.name} intro={siteOwner.intro} title="About Viet" />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/portfolio" element={<Portfolio username={siteOwner.githubUsername} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/photos" element={<Photos />} />
            </Routes>
            {/* </ErrorBoundary> */}
          </main>

          {/* ---------------------------
              Footer Section
              ---------------------------
              Displays site footer at the bottom of the page
          --------------------------- */}
          <footer className="App-footer">
            <Footer />
          </footer>
        </div>
      </Router>
    </div>
  );
}
// Export App component to be used as the root component in index.js
export default App;
