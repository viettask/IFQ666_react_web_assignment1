import React, { useEffect, useState } from 'react';
import './GitHubRepos.css';

// Simple component to fetch and display public GitHub repositories for a user.
// Props:
// - username (string) optional: GitHub username to fetch. Defaults to 'octocat'.
function GitHubRepos({ username = 'octocat', max = 12 }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${max}`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`${res.status} ${res.statusText}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        // GitHub returns an array of repo objects
        setRepos(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Failed to fetch repos');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [username, max]);

  return (
    <section className="gh-repos">
      <h2>GitHub Repositories</h2>
      <p className="gh-note">Showing public repositories for <strong>{username}</strong>. Replace the username prop in <code>App.js</code> to customize.</p>

      {loading && <div className="gh-loading">Loading repositories…</div>}

      {error && <div className="gh-error">Error: {error}</div>}

      {!loading && !error && repos.length === 0 && (
        <div className="gh-empty">No public repositories found.</div>
      )}

      {!loading && !error && repos.length > 0 && (
        <ul className="gh-list">
          {repos.map((r) => (
            <li key={r.id} className="gh-item">
              <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="gh-link">
                <div className="gh-title">{r.name}</div>
                {r.description && <div className="gh-desc">{r.description}</div>}
                <div className="gh-meta">
                  {r.language && <span className="gh-lang">{r.language}</span>}
                  <span className="gh-stats">★ {r.stargazers_count}</span>
                  <span className="gh-stats">Forks: {r.forks_count}</span>
                  <span className="gh-updated">Updated {new Date(r.updated_at).toLocaleDateString()}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default GitHubRepos;
