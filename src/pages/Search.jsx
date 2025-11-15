import React from 'react';
import GeoSearchGoogleMap from '../API/GeoSearchGoogleMap.jsx';
import SearchForm from '../API/SearchForm.jsx';

function Search() {
    return (
        <div className='row'>
            {/* Search Form Section */}
            <div className="row mb-4">            
            <div className="w-full px-4 mt-5 col-12">
                <SearchForm />
            </div>
            </div>

            { /* Map Section */}
            <div className="row">            
            <div className="w-full px-4 mt-5  col-12">
                <GeoSearchGoogleMap />
            </div>
            </div>
        </div>
    )
}

export default Search
