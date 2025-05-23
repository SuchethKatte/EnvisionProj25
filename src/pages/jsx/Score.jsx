import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Score.css";
import MapScore from "./MapScore";
import LoadingAnimation from "./LoadingAnimation";
import ScoreCard from "./ScoreCard";
import GearLoader from "./GearLoader";
function Score() {
  const location = useLocation();
  const navigate = useNavigate();
  const { guessCoords, trueCoords } = location.state || {};
  
  const [defaultLocation, setDefaultLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(null);

  // Function to generate random coordinates
  const generatetrueCoords = () => {
    // Random lat between -60 and 75 (avoiding extreme poles)
    const lat = Math.random() * 135 - 60;
    // Random lng between -180 and 180
    const lng = Math.random() * 360 - 180;
    return { lat, lng };
  };

  // Function to calculate distance between two coordinates in kilometers (Haversine formula)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  }

  // Function to calculate score based on distance
  function calculateScore(distance) {
    // Max score of 5000 if exact location, decays the further away you are
    const score=5000*Math.exp(-distance/5000);
    return score;
  }

  // Generate random location and calculate distance/score
  useEffect(() => {
    if (!guessCoords) return;
    
    

    const calculatedDistance = calculateDistance(
      guessCoords.lat,
      guessCoords.lng,
      trueCoords.lat,
      trueCoords.lng
    );
    setDistance(calculatedDistance);
    setScore(calculateScore(calculatedDistance));
  }, [guessCoords]);

  if (!guessCoords) {
    return (
      <div className="dashboard-container">
        <div className="top-row">
          <div className="box"><LoadingAnimation/></div>
          <div className="box">
            <ScoreCard
            Score={0}
          />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="top-row">
        
        {/* <div className="box">
          <div className="score-details">
            <h2>Your Score</h2>
            <h3>{score ? Math.round(score) : "Calculating..."}</h3>
            <div className="detail-item">
              <span className="detail-label">Your guess:</span>
              <span className="detail-value">
                {guessCoords.lat.toFixed(5)}°, {guessCoords.lng.toFixed(5)}°
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Target location:</span>
              <span className="detail-value">
                {defaultLocation ? `${defaultLocation.lat.toFixed(5)}°, ${defaultLocation.lng.toFixed(5)}°` : "Generating..."}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Distance:</span>
              <span className="detail-value">
                {distance ? `${distance.toFixed(2)} km` : "Calculating..."}
              </span>
            </div>
          </div>
        </div> */}
        
          <ScoreCard
            Score={Math.round(score) }
          />
          <div className="box">
          <MapScore 
            guessCoords={guessCoords} 
            defaultLocation={trueCoords} 
          />
        </div>
      </div>
    </div>
  );
}

export default Score;