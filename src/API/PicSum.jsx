import React, { useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';



function PicSum() {
    const [randomPhotos, setRandomPhotos] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(false); // Added for better UX

    // 💡 1. Add the Ref Flag
    const hasFetchedRef = useRef(false);

    const fetchRandomPhotos = useCallback(async (page) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=4`);
            // Append new photos to the existing ones
            setRandomPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
            setNextPage(nextPage + 1);
        } catch (error) {
            console.error('Error fetching random photos:', error);
        } finally {
            setLoading(false); // End loading
        }
    }, [setLoading, setRandomPhotos, setNextPage, nextPage]); // Depend only on state setters (which are stable)

    const loadMorePhotos = useRef({});
    loadMorePhotos.current = async () => {
        setNextPage((prev) => prev + 1); // increment for next fetch
        fetchRandomPhotos(nextPage); // fetch current next page
    }

    useEffect(() => {
        // 2. Check the flag before fetching
        if (hasFetchedRef.current === false) {
            fetchRandomPhotos(nextPage);
            // 3. Set the flag to true to prevent the second Strict Mode run
            hasFetchedRef.current = true;
        }
    }, [fetchRandomPhotos, nextPage]); // Empty dependency array to run only once on mount

    console.log('Random Photos:', randomPhotos);
    return (
        <div className="picsum-container">
            {loading && randomPhotos.length === 0 && <p>Loading initial photos...</p>}

            <div className="photo-grid grid-cols-2 gap-5 p-5">
                {randomPhotos.length > 0 && randomPhotos.map((photo, index) => (
                    <div key={`${photo.download_url}${index}`} className="photo-card">
                        <div   className="bg-white relative h-[200px]">
                            <img
                                src={photo.download_url}
                                alt={photo.author}
                                className="photo-image"
                            />
                        </div>
                        <div className="photo-info">
                            <p className="author text-sm">Author: {photo.author}</p>
                            <p className="photo-id text-sm">ID: {photo.id}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* The 'Load More' button now calls the fetch function with the current nextPage state */}
            {randomPhotos.length > 0 && (
                <button onClick={loadMorePhotos.current} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More Photos'}
                </button>
            )}
        </div>
    );

}



export default PicSum;
