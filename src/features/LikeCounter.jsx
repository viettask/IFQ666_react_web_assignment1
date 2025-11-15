import React, { useState } from 'react'; // Import useState
import './LikeCounter.css';  //Import CSS for LikeCounter component

// Thumb up / thumb down component using the useLikeCounter hook
export default function LikeCounter() {
  //State for likes and dislikes
  const [likeCount, setUpCount] = useState(0);         // Holds the number of likes
  const [dislikeCount, setDownCount] = useState(0);     // Holds the number of dislikes

  console.log(likeCount, dislikeCount);                 // Logs the current counts (useful for debugging)

  //Function to handle votes
  const handleVote = (type) => {
    if (type === 'like') {
      setUpCount((prevCount) => prevCount + 1); // Increment like count
    } else if (type === 'dislike') {
      setDownCount((prevCount) => prevCount + 1); // Increment dislike count
    }
  };

  return (
    // Container for the like/dislike buttons
    // role="group" and aria-label improve accessibility
    <div className="like-counter" role="group" aria-label="Like controls">
      {/* Like button */}
      <button
        className={`like-btn up`}               // Assigns "up" class for styling
        aria-pressed={likeCount > 0}            // Accessibility: indicates if button is pressed
        aria-label="Thumbs up"                  // Accessibility: description of button  
        onClick={() => handleVote('like')}      // Call handleVote with 'like' when clicked
      >

        {/* SVG thumbs-up icon */}
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M2 10h4v12H2z" fill={likeCount > 0 ? '#0b74de' : '#666'} />
          <path d="M22 11c0-1.1-.9-2-2-2h-6l1.34-5.36.03-.32A1 1 0 0 0 14.34 2l-5.73 7.24A2 2 0 0 0 10 12v8a2 2 0 0 0 2 2h6a4 4 0 0 0 4-4v-7z" fill={likeCount > 0 ? '#0b74de' : '#999'} />
        </svg>
        <span className="count">{likeCount}</span>
      </button>

      {/* Dislike button */}
      <button
        className={`like-btn down`}
        aria-pressed={dislikeCount > 0}
        aria-label="Thumbs down"
        onClick={() => handleVote('dislike')}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M22 14h-4V2h4z" fill={dislikeCount > 0 ? '#de3b3b' : '#666'} />
          <path d="M2 13c0 1.1.9 2 2 2h6l-1.34 5.36-.03.32A1 1 0 0 0 9.66 22l5.73-7.24A2 2 0 0 0 16 11V3a2 2 0 0 0-2-2H8a4 4 0 0 0-4 4v8z" fill={dislikeCount > 0 ? '#de3b3b' : '#999'} />
        </svg>
        <span className="count">{dislikeCount}</span>
      </button>
    </div>
  );
}
