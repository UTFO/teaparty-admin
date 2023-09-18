import "./Question.css";

import React from "react";
import { useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Hidden } from "@mui/material";

function Question(props) {
  const [clicked, setClicked] = useState(false);

  const toggle = () => {
    setClicked(!clicked);
  };

  return (
    <div className="question">
      <div className="title" onClick={() => toggle()}>
        <h1>{props.question}</h1>
        <span>{clicked ? <RemoveCircleIcon /> : <AddCircleIcon />}</span>
      </div>
      <div
        className="expand"
        style={
          clicked
            ? { "--heightVal": "auto", "--overflowVal": "visible" }
            : { "--heightVal": 0, "--overflowVal": "hidden" }
        }
      >
        <p>{props.answer}</p>
      </div>
    </div>
  );
}

export default Question;
