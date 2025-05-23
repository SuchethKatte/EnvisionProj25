import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Street Wonderer</h1>
      <Link to="/Game" >
        
          <button class={styles.button}>
            Start
          </button>

      </Link>
    </div>

  );
}

export default Home;
