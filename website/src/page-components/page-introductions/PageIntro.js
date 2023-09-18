import React from "react";
import "./PageIntro.css";

import CupFAQ from "./images/cupFAQ.png";

import CupAbout from "./images/cupAbout.png";

import CupEvent from "./images/cupEvent.png";

import CupTeam from "./images/cupTeam.png";

import Smoke from "../home/components/Smoke";

function PageIntro(props) {
  var Cup;

  switch (props.page) {
    case "about":
      Cup = CupAbout;
      break;
    case "events":
      Cup = CupEvent;
      break;
    case "team":
      Cup = CupTeam;
      break;
    case "faq":
      Cup = CupFAQ;
      break;
    default:
      Cup = CupAbout;
  }

  return (
    <>
      <div className="page-intro-container">
        <Smoke />
        <div className="page-intro-container-text">
          <h2>{props.title}</h2>
          <p>{props.text}</p>
        </div>
      </div>

      <img src={Cup} />
    </>
  );
}

export default PageIntro;
