import React, { useState } from "react";
import styles from "../css/Game.module.css";
import Map from "./Map";
import Timer from "./Timer";
import View from "./View";

function Game() {
  const [guessCoords, setGuessCoords] = useState(null);
  const [trueCoords, setTrueCoords] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.mapillary}>
        
        <View 
          setTrueCoords={setTrueCoords} 
          setImageLoaded={setImageLoaded}
        />
        
      </div>
      <div className={styles.timer}>
        <Timer 
          guessCoords={guessCoords} 
          defaultCoords={trueCoords}
          imageLoaded={imageLoaded}
        />
      </div>
      <div className={styles.leaflet}>
        <Map onGuess={setGuessCoords} />
      </div>
    </div>
  );
}

export default Game;
