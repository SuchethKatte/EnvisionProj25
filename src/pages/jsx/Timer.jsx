import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Timer.css";

function Timer({ guessCoords, defaultCoords } ) {
    const [seconds, setSeconds] = useState(10);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [seconds, submitted]);

    const handleSubmit = () => {
        if (!submitted) {
            setSubmitted(true);
            navigate("/Score", {
                state: {
                    guessCoords: guessCoords || null,
                    defaultCoords: defaultCoords || null,
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