import React, { useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';



function PicSum() {
    // -------------------------------------------------------------------
    //  STATE MANAGEMENT
    // -------------------------------------------------------------------
    const [randomPhotos, setRandomPhotos] = useState([]);           // List of fetched photos
    const [nextPage, setNextPage] = useState(1);                    // Current page index for the API
    const [loading, setLoading] = useState(false);                  // Loading state to improve UX

    // -------------------------------------------------------------------
    //  FIX STRICT MODE DOUBLE FETCHING (React 18 development mode)
    //  This ref ensures we fetch ONLY once on initial mount
    //  Strict Mode mounts components twice to detect side effects
    // -------------------------------------------------------------------
    const hasFetchedRef = useRef(false);


    // -------------------------------------------------------------------
    //  fetchRandomPhotos
    //  This function fetches a page of photos and appends them to state.
    //  Wrapped in useCallback to avoid unnecessary re-creations.
    // -------------------------------------------------------------------
    const fetchRandomPhotos = useCallback(async (page) => {
        setLoading(true); // show loading indicator
        try {
            // Picsum API — fetch 4 photos per page
            const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=4`);
            // Append new photos to the existing ones
            setRandomPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
            // Increment page for next fetch
            setNextPage(nextPage + 1);
        } catch (error) {
            console.error('Error fetching random photos:', error);
        } finally {
            setLoading(false); // stop loading
        }
    }, [setLoading, setRandomPhotos, setNextPage, nextPage]); // dependency: tracks current page index

    // -------------------------------------------------------------------
    //  loadMorePhotos
    //  A function stored in a ref so it remains stable and accessible
    //  without causing re-renders.
    //  Calling it loads the next page of photos.
    // -------------------------------------------------------------------
    const loadMorePhotos = useRef({});
    loadMorePhotos.current = async () => {
        setNextPage((prev) => prev + 1); // increment for next fetch
        fetchRandomPhotos(nextPage); // fetch current next page
    }

    // -------------------------------------------------------------------
    //  Initial Data Fetch (Runs ONLY on first mount)
    //  Prevents double-fetch caused by React.StrictMode in dev
    // -------------------------------------------------------------------
    useEffect(() => {
        // 2. Check the flag before fetching
        if (hasFetchedRef.current === false) {
            fetchRandomPhotos(nextPage);
            // 3. Set the flag to true to prevent the second Strict Mode run
            hasFetchedRef.current = true;
        }
    }, [fetchRandomPhotos, nextPage]); // Empty dependency array to run only once on mount

    console.log('Random Photos:', randomPhotos);


    // -------------------------------------------------------------------
    //  RENDER UI
    // -------------------------------------------------------------------
    return (
        <div className="picsum-container">
            {/* Loading message only on initial load */}
            {loading && randomPhotos.length === 0 && <p>Loading initial photos...</p>}


            {/* Photo grid */}
            <div className="photo-grid grid-cols-2 gap-5 p-5">
                {randomPhotos.length > 0 && randomPhotos.map((photo, index) => (
                    <div key={`${photo.download_url}${index}`} className="photo-card">
                        {/* Photo Image */}
                        <div className="bg-white relative h-[200px]">
                            <img
                                src={photo.download_url}
                                alt={photo.author}
                                className="photo-image"
                            />
                        </div>
                        {/* Photo Details */}
                        <div className="photo-info">
                            <p className="author text-sm">Author: {photo.author}</p>
                            <p className="photo-id text-sm">ID: {photo.id}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* The 'Load More' button now calls the fetch function with the current nextPage state */}
            {randomPhotos.length > 0 && (
                <button className="button" onClick={loadMorePhotos.current} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More Photos'}
                </button>
            )}
        </div>
    );

}


// Export the component so it can be used in other parts of the app
export default PicSum;
