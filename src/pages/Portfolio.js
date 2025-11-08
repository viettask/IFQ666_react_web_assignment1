import React, { useEffect, useState } from 'react';
import './Portfolio.css';

function Portfolio({ username = 'viettask' }) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Optional token from env (REACT_APP_GITHUB_TOKEN)
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};

    const ac = new AbortController();
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const userUrl = `https://api.github.com/users/${encodeURIComponent(username)}`;
        const reposUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${perPage}&page=${page}`;

        const [userResp, reposResp] = await Promise.all([
          fetch(userUrl, { headers, signal: ac.signal }),
          fetch(reposUrl, { headers, signal: ac.signal })
        ]);

        if (!userResp.ok) {
          const text = await userResp.text();
          throw new Error(`User fetch failed: ${userResp.status} ${userResp.statusText} - ${text}`);
        }
        if (!reposResp.ok) {
          const text = await reposResp.text();
          throw new Error(`Repos fetch failed: ${reposResp.status} ${reposResp.statusText} - ${text}`);
        }

        const userData = await userResp.json();
        const reposData = await reposResp.json();

        setUser(userData);
        setRepos(reposData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load GitHub data');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, [username, page, perPage]);

  return (
    <section className="page page-portfolio">
      <h1>Portfolio</h1>

      {loading && <div className="loading">Loading GitHub data…</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && user && (
        <div className="gh-user">
          <img src={user.avatar_url} alt={`${user.login} avatar`} width={88} height={88} />
          <div>
            <h2><a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.name || user.login}</a></h2>
            {user.bio && <p>{user.bio}</p>}
            <p>
              <strong>{user.public_repos}</strong> public repos · <strong>{user.followers}</strong> followers
            </p>
          </div>
        </div>
      )}

      {!loading && !error && repos && repos.length === 0 && (
        <p>No public repositories found.</p>
      )}

      {!loading && !error && repos && repos.length > 0 && (
        <ul className="repo-grid">
          {repos.map((r) => (
            <li key={r.id} className="repo">
              <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                <h3>{r.name}</h3>
              </a>
              {r.description && <p className="desc">{r.description}</p>}
              <div className="meta">
                {r.language && <span className="lang">{r.language}</span>}
                <span>★ {r.stargazers_count}</span>
                <span>Forks: {r.forks_count}</span>
                <span>Updated {new Date(r.updated_at).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || loading}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={loading || repos.length < perPage}>
          Next
        </button>
      </div>
    </section>
  );
}

export default Portfolio;