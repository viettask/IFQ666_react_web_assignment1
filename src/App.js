import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import ErrorBoundary from './ErrorBoundary';
import NavBar from './features/NavBar';
import Footer from './features/Footer';
import Search from './pages/Search';
import Photos from './pages/Photos';


function App() {

  const siteOwner = {
    name: 'Viet Nguyen',
    intro: "A full-stack developer specializing in scalable web applications, cloud solutions and data.",
    githubUsername: 'viettask'
  };

  return (
    <div>
    <Router>
      <div className="App">
          {/* Header Section */}
        <header >
          <NavBar className="App-header"/>
        </header>


        {/* Main Content Section */}
        <main className="App-main">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home name={siteOwner.name} intro={siteOwner.intro} />} />
              <Route path="/about" element={<About name={siteOwner.name} intro={siteOwner.intro} title="About Viet" />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/portfolio" element={<Portfolio username={siteOwner.githubUsername} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/photos" element={<Photos />} />
            </Routes>
          </ErrorBoundary>
        </main>

        {/* Footer Section */}
        <footer className="App-footer">
        <Footer />
        </footer>
      </div>
    </Router>
    </div>
  );
}

export default App;
