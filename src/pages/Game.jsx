import React, { useState } from "react";
import "./Game.css";
import Map from "./Map";
import Timer from "./Timer";
import View from "./View";

function Game() {
  const [timerActive, setTimerActive] = useState(false);
  const handleImageLoaded = () => {
    setTimerActive(true);  // This will trigger the timer to start
  };
  const [guessCoords, setGuessCoords] = useState(null);
  return (
    <div className="container">
      <div className="mapillary">
        <View onImageLoaded={handleImageLoaded} />
      </div>
      <div className="timer">
        <Timer 
          guessCoords={guessCoords} 
          active={timerActive}
        />
      </div>
      <div className="leaflet">
        <Map onGuess={setGuessCoords} />
      </div>
    </div>
  );
}

export default Game;
