
/**
 * resumeData Object
 *
 * Purpose:
 * This object organizes all the resume information of a candidate in a structured format.
 * It can be used to dynamically render resume sections in a React application or any other frontend project.
 *
 * Structure:
 * 1. overview      : Contains a brief summary of the candidate.
 * 2. careerHistory : An array of objects, each representing a job experience.
 * 3. skills        : An array of technical and professional skills.
 * 4. publications  : An array for listing any publications (currently empty).
 * 5. qualifications: An array of educational qualifications and certifications.
 */
const resumeData = {
  overview: {
    summary: "●	I’m a software developer with a passion for full-stack development, complemented by additional skills in data and DevOps, enabling me to create scalable solutions and optimise processes throughout the tech stack."
  },
  careerHistory: [
    {
      jobTitle: "Software Developer at Viettask",
      dates: "2024 - Present",
      responsibilities: [
        "Developed and maintained web applications using React",
        "Collaborated with cross-functional teams to build new features and optimize existing functionality",
        "Implemented RESTful APIs and integrated them with frontend components"
      ]
    }
  ],
  skills: [
    "React",
    "JavaScript (ES6+)",
    "Node.js",
    "HTML5 & CSS3",
    "Bootstrap",
    "Git & GitHub",
    "Java",
    "C#",
    "SQL",
    "Python",
    "Docker"
  ],
  publications: [
  ],
  qualifications: [
    {
      degree: "Bachelor of Electrical Engineering",
      institution: "Queensland University of Technology",
      year: 2018
    },
    {
      degree: "Graduate Certificate in Computer Science",
      institution: "Queensland University of Technology",
      year: 2025
    },
  ]
};

// Exporting the object to be used in other modules/components
export default resumeData;