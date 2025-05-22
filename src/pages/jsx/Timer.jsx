import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Timer.css";
import LoadingAnimation from "./LoadingAnimation";
function Timer({ guessCoords, defaultCoords, imageLoaded } ) {
    const [seconds, setSeconds] = useState(50);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const [timerActive, setTimerActive] = useState(false);
    useEffect(() => {
    if (imageLoaded && !timerActive) {
      setTimerActive(true);
    }
  }, [imageLoaded]);

    useEffect(() => {
        if (!timerActive) return;
        if (submitted) return;
        if (seconds === 0) {
            handleSubmit();
            return;
        }
        //XXX: for debug puposes only
        // Immediately navigate if coordinates are selected
        // if (guessCoords) {
        //   navigate("/Score", {
        //     state: {
        //       guessCoords,
        //     }
        //   });
        //   return;
        // }



        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds, submitted, timerActive ]);

    const handleSubmit = () => {
        if (!submitted) {
            setSubmitted(true);
            navigate("/Score", {
                state: {
                    guessCoords: guessCoords || null,
                    trueCoords: defaultCoords || null,
                },
            });
        }
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        
            <div className = "timer-container" >
            <div className = "time" > { formatTime(seconds) } </div>
            <button className ="submit-button" onClick={handleSubmit} disabled ={!guessCoords || submitted}> Submit</button > 
        </div >
        
        
                
    );
}

export default Timer;