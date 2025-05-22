import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
function Home() {
  return (
    <div>
      <h1>Welcome to Street Wonderer</h1>
      <Link to="/Game" >
        <button class="btn">
          <span>Play</span>
        </button>
      </Link>
    </div>
  );
}

export default Home;
