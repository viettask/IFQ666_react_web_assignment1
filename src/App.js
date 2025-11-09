import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import ErrorBoundary from './ErrorBoundary';
import NavBar from './features/NavBar';



function App() {

  const siteOwner = {
    name: 'Viet Nguyen',
    intro: "I'm a software developer with a passion for coding and technology",
    githubUsername: 'viettask'
  };

  return (
    <div>
    <Router>
      <div className="App">
        <NavBar />

        <main className="App-main">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home name={siteOwner.name} intro={siteOwner.intro} />} />
              <Route path="/about" element={<About name={siteOwner.name} intro={siteOwner.intro} title="About Viet" />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/portfolio" element={<Portfolio username={siteOwner.githubUsername} />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
    </div>
  );
}

export default App;
