import React from 'react';
import GithubRepoProfile from '../API/GithubRepoProfile';

function Portfolio({ username = 'viettask' }) {
 
  return (
    <section className="page page-portfolio">
      <GithubRepoProfile username={username} />
    </section>
  );
}

export default Portfolio;