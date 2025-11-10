import React from 'react';
import defaultPhoto from '../assets/henry_cookie.jfif';
import GeoSearchGoogleMap from '../features/GeoSearchGoogleMap.jsx';

//Home component with props destructuring
function Home({ name = 'Viet Nguyen', photo: propPhoto }) {
  // if no photo prop provided, use defaultPhoto
  const photo = propPhoto || defaultPhoto;

  return (
    <section className="page page-home d-flex flex-column align-items-center">
    /* Top Section: Image + Greeting */
        <div className="row justify-content-center">
          <div className="col-md-8 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
            <img src={photo} alt={name} style={{ width: 280, height: 400, objectFit: 'cover' }} />
            <div className="text-center">
              <h1 className="h3 mb-2">Xin Chào, I'm {name}</h1>
            </div>
          </div>
        </div>
      /* Map Section */
      <div className="w-full px-4 mt-5">
        <GeoSearchGoogleMap />
      </div>
    </section>
  );
}

export default Home;
