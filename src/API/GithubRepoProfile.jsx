import React, { useEffect, useState } from 'react';

// -------------------------------
// STATE VARIABLES
// -------------------------------
function GithubRepoProfile({ username = 'viettask' }) {
    const [user, setUser] = useState(null);             // GitHub user profile data
    const [repos, setRepos] = useState([]);             // List of repositories
    const [page, setPage] = useState(1);                // Current page for pagination
    const [perPage] = useState(9);                      // Repositories per page
    const [loading, setLoading] = useState(true);       // Loading state
    const [error, setError] = useState(null);           // Store any error message


    // ------------------------------------------------
    // EFFECT: FETCH USER + REPOS WHEN DEPENDENCIES CHANGE
    // Runs when: username, page, or perPage changes.
    // ------------------------------------------------
    useEffect(() => {

        // Optional token from env (REACT_APP_GITHUB_TOKEN)
        const token = process.env.REACT_APP_GITHUB_TOKEN;
        const headers = token ? { Authorization: `token ${token}` } : {};

        const ac = new AbortController();

        // Set loading to true before making a request
        setLoading(true);

        async function load() {
            try {
                const userUrl = `https://api.github.com/users/${encodeURIComponent(username)}`;
                const reposUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${perPage}&page=${page}`;


                // Make both API requests in parallel
                const [userResp, reposResp] = await Promise.all([
                    fetch(userUrl, { headers, signal: ac.signal }),
                    fetch(reposUrl, { headers, signal: ac.signal })
                ]);

                // ---------------------------
                // ERROR HANDLING FOR USER FETCH
                // ---------------------------
                if (!userResp.ok) {
                    const text = await userResp.text();
                    throw new Error(`User fetch failed: ${userResp.status} ${userResp.statusText} - ${text}`);
                }
                if (!reposResp.ok) {
                    const text = await reposResp.text();
                    throw new Error(`Repos fetch failed: ${reposResp.status} ${reposResp.statusText} - ${text}`);
                }

                // Convert responses into JSON
                const userData = await userResp.json();
                const reposData = await reposResp.json();

                // Update state with retrieved data
                setUser(userData);
                setRepos(reposData);
            } catch (err) {
                // Ignore abort errors (triggered on component unmount)
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Failed to load GitHub data');
                }
            } finally {
                // Stop loading state no matter what happens
                setLoading(false);
            }
        }

        // Trigger data load
        load();
        // Cleanup: Abort fetch request if component unmounts or dependencies change
        return () => {
            ac.abort();
        };
    }, [username, page, perPage]);  // Dependencies that trigger refetching

    // ------------------------------------------------------
    // JSX RENDERING SECTION
    // ------------------------------------------------------
    return (
        <div>

            <section className="page page-portfolio">
                {/* Loading indicator */}
                {loading && <div className="loading">Loading GitHub data…</div>}
                {/* Error message if request failed */}
                {error && <div className="error">Error: {error}</div>}
                {/* GitHub user profile header */}
                {!loading && !error && user && (
                    <div className="gh-user">
                        <img src={user.avatar_url} alt={`${user.login} avatar`} width={100} height={120} />
                        <div>
                            <h3><a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.name || user.login}</a></h3>
                            {user.bio && <p>{user.bio}</p>}
                            <p>
                                <strong>{user.public_repos}</strong> public repos · <strong>{user.followers}</strong> followers
                            </p>
                        </div>
                    </div>
                )}
                {/* Display message if user has no repos */}
                {!loading && !error && repos && repos.length === 0 && (
                    <p>No public repositories found.</p>
                )}


                {/* Display repo grid if repos exist */}
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
                {/* Pagination controls */}
                <div className="pagination">
                    <button className="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || loading}>
                        Previous
                    </button>
                    <span>Page {page}</span>
                    <button className="button" onClick={() => setPage((p) => p + 1)} disabled={loading || repos.length < perPage}>
                        Next
                    </button>
                </div>

            </section>
        </div>
    )
}
// Export the component so it can be used in other parts of the app
export default GithubRepoProfile
