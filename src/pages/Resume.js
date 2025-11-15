import React from 'react';
import resumeData from '../features/dataResume';

function Resume() {
  return (
<div className="container">
      {/* Overview Summary Section */}
      <section className="mb-4">
        <h3 className="">Overview Summary</h3>
        <p className="list-unstyled">{resumeData.overview.summary}</p>
      </section>

      {/* Career History Section */}
      <section className="mb-4">
        <h3 className="">Career History</h3>
        {resumeData.careerHistory.map((job, index) => (
          <div key={index} className="mb-3">
            <h4 className="h5">{job.jobTitle}</h4>
            <p className="">{job.dates}</p>
            <ul className="list-group">
              {job.responsibilities.map((responsibility, idx) => (
                <li key={idx} className="list-group-item">{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="mb-4">
        <h3 className="">Skills</h3>
        <ul className="row row-cols-2 row-cols-md-4">
          {resumeData.skills.map((skill, index) => (
            <li key={index} className="col mb-2">
              <span className="badge bg-primary">{skill}</span>
            </li>
          ))}
        </ul>
      </section>


      {/* Qualifications Section */}
      <section className="mb-4">
        <h3 className="">Qualifications</h3>
        <ul className="list-unstyled">
          {resumeData.qualifications.map((qualification, index) => (
            <li key={index}>
              <h5>{qualification.degree}</h5>
              <p className="">{qualification.institution}, {qualification.year}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Resume;
