import React from 'react';
import LikeCounter from '../features/LikeCounter.jsx';
import CardContact from '../features/CardContact.jsx';


function About({ name = 'Viet Nguyen',   intro = "I'm a software developer with a passion of coding and technology.", greeting ='Let give me a bunch of like to support' }) {

  
  return (
    <section className="page page-about d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h3 className="mb-2">{name}</h3>
            <p>{intro}</p>
            <p>{greeting}</p>
            <div className="d-flex justify-content-center mt-3">
              <LikeCounter />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
              <CardContact />
      </div>

    </section>
  );
}

export default About;