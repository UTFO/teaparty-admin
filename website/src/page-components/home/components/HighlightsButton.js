import React from "react";
import "./HighlightsButton.css";
import slide1 from "../images/slide1.png";
const HighlightsButton = () => {
  return (
    <div className="highlights-container">
      <a href={"#highlights"} className="circle">
        <h1 className="highlights-text">Highlights</h1>
      </a>
    </div>
  );
};

export default HighlightsButton;
