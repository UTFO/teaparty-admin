import React from "react";
import Cup from "./cupHome.png";
import "./WelcomeMessage.css";
import Smoke from "./Smoke.js";
const WelcomeMessage = () => {
  return (
    <div className="welcome-cup">
      <div className="smoke">
        <div className="smoke-space"></div>
        <Smoke />
        <svg
          width="100%"
          height="45"
          xmlns="http://www.w3.org/2000/svg"
          className="top-drawing"
        >
          <line
            x1="0"
            x2="0"
            y1="0"
            y2="100%"
            stroke="black"
            stroke-width="2"
          />
          <line x1="0" x2="8%" y1="0" y2="0" stroke="black" stroke-width="2" />
        </svg>
        <h1 className="welcome-title">
          Welcome to <br></br> University of Toronto's Tea Party
        </h1>
        <h2 className="welcome-subtitle">
          We welcome you and all your tea needs
        </h2>
        <svg
          width="100%"
          height="45"
          xmlns="http://www.w3.org/2000/svg"
          className="top-drawing"
        >
          <line
            x1="100%"
            x2="100%"
            y1="0"
            y2="100%"
            stroke="black"
            stroke-width="2"
          />
          <line
            x1="100%"
            x2="92%"
            y1="100%"
            y2="100%"
            stroke="black"
            stroke-width="2"
          />
        </svg>
        <h3 className="welcome-text">
          Feel free to explore the website<br></br> and learn more about us!
        </h3>
      </div>

      <img src={Cup} />
    </div>
  );
};

export default WelcomeMessage;
