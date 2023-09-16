import Instagram_Icon from "./images/icons/instagram-icon.png";
import Twitter_Icon from "./images/icons/twitter-icon.png";
import Linkedin_Icon from "./images/icons/linkedin-icon.png";

import Arrow_Icon from "./images/icons/Arrow.png";

import Rope from "./images/objects/Rope.png";
import Teabag from "./images/objects/Teabag.png";

import { useState, useEffect } from "react";

import "./teamPage.css";
import React from "react";

import PageIntro from "../page-introductions/PageIntro.js";

import { TeamText } from "../page-introductions/imports.js";
import { Navbar, Footer } from "../imports.js";
import { useTeamData } from "./teamContext";

var borderActiveColor = "#b3ffc3";
var cardActiveColor = "#e1ffda";

var borderInactiveColor = "#ececec";
var cardInactiveColor = "rgba(0, 0, 0, 0.05)";

var sizeScale = 0.9;
let displaySide = 2 + 2;
// let memberArray = [];

let prev = 0;
let currentRotate = 0;

// var Members = require("../../data/texts/Team.json");

// while (memberArray.length < 3 * (displaySide * 2 + 1))
//   memberArray = [...memberArray, ...Members];

function TeamCard(props) {
  const memberArray = useTeamData();

  // Check if memberArray is empty or null to determine if data is loading
  if (!memberArray || memberArray.length === 0) {
    // Data is loading, render a loading indicator
    return <div>Loading...</div>;
  }
  var cardColor = props.current ? cardActiveColor : cardInactiveColor;
  var borderColor = props.current ? borderActiveColor : borderInactiveColor;

  var rotation = props.current ? 18 : 0;
  const waitFor = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const getClickedCard = async () => {
    props.setPreventClick(true);

    prev = props.active;
    props.setActive(props.index);

    if (currentRotate == 180) currentRotate = 0;
    else currentRotate = 180;

    document
      .getElementsByClassName("prev")[0]
      .classList.add("spinPrev-animation");
    document
      .getElementsByClassName("current")[0]
      .classList.add("spinCurrent-animation");

    await waitFor(500).then();

    document
      .getElementsByClassName("prev")[0]
      .classList.remove("spinPrev-animation");
    document
      .getElementsByClassName("current")[0]
      .classList.remove("spinCurrent-animation");

    props.setPreventClick(false);
  };

  var activeStyle = {
    "--cardColor": cardActiveColor,
    "--inactiveColor": cardActiveColor,
    "--sizeScale": sizeScale,
    opacity: 0 + !props.hide,
    cursor: "initial",
  };

  var inactiveStyle = {
    "--cardColor": "rgba(0, 0, 0, 0)",
    "--inactiveColor": cardInactiveColor,
    "--sizeScale": sizeScale,
    opacity: 0 + !props.hide,
    cursor: "pointer",
  };

  var instagramExist = props.member.instagram != "";
  var twitterExist = props.member.twitter != "";
  var linkedinExist = props.member.linkedin != "";

  return props.disable ? (
    <></>
  ) : (
    <div
      style={{
        "--size": props.size,
        "--x": props.position,
        "--sizeScale": sizeScale,
        opacity: 0 + !props.hide,
      }}
      className="page-team-card-container"
    >
      <div className="page-team-card-rotate-self">
        <div
          style={{
            ...(props.current ? activeStyle : inactiveStyle),
            cursor: props.hide ? "initial" : "pointer",
          }}
          className="page-team-card-second-container"
          onClick={
            props.hide || props.preventClick
              ? () => {}
              : () => {
                  getClickedCard();
                }
          }
        >
          <h1 style={{ opacity: 0.5 + props.active }}>{props.member.name}</h1>
          <h2 style={{ opacity: 0.5 + props.active }}>{props.member.role}</h2>
          <img
            style={{ "--borderColor": borderColor }}
            src={"https://tea-party-images.s3.ca-central-1.amazonaws.com/" + props.member.image}
            alt={props.member.name + "'s Picture"}
          />
          {console.log(props.member.image)}
        </div>

        <div
          style={{ opacity: props.current ? 1 : 0 }}
          className="page-team-card-socials"
        >
          {instagramExist ? (
            <div style={{ "--i": -rotation }}>
              <a
                style={{ "pointer-events": props.current ? "initial" : "none" }}
                href={props.member.instagram}
                target="_blank"
              >
                <img src={Instagram_Icon} />
              </a>
            </div>
          ) : (
            <></>
          )}
          {linkedinExist ? (
            <div style={{ "--i": rotation }}>
              <a
                style={{ "pointer-events": props.current ? "initial" : "none" }}
                href={props.member.linkedin}
                target="_blank"
              >
                <img src={Linkedin_Icon} />
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

function TeaCard(props) {
  let current = props.index;
  const memberArray = useTeamData();

  // Check if memberArray is empty or null to determine if data is loading
  if (!memberArray || memberArray.length === 0) {
    // Data is loading, render a loading indicator
    return <div>Loading...</div>;
  }

  return (
    <div className="page-team-teabag">
      <img id="rope" src={Rope} />
      <div id="teabag">
        <img
          style={{ transform: "rotateY(" + currentRotate + "deg)" }}
          id="teabag-img"
          src={Teabag}
        />
        <div>
          <section>
            <p className="prev">{memberArray[prev]["message"]}</p>
          </section>
          <section>
            <p className="current">{memberArray[current]["message"]}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

function Arrow(props) {
  const memberArray = useTeamData();

  // Check if memberArray is empty or null to determine if data is loading
  if (!memberArray || memberArray.length === 0) {
    // Data is loading, render a loading indicator
    return <div>Loading...</div>;
  }
  const waitFor = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const slide = async (up) => {
    props.setPreventClick(true);

    prev = props.active;
    if (currentRotate == 180) currentRotate = 0;
    else currentRotate = 180;

    document
      .getElementsByClassName("prev")[0]
      .classList.add("spinPrev-animation");
    document
      .getElementsByClassName("current")[0]
      .classList.add("spinCurrent-animation");

    if (up) {
      if (props.active == memberArray.length - 1) props.setActive(0);
      else props.setActive(props.active + 1);
    } else {
      if (props.active == 0) props.setActive(memberArray.length - 1);
      else props.setActive(props.active - 1);
    }

    await waitFor(500).then();

    document
      .getElementsByClassName("prev")[0]
      .classList.remove("spinPrev-animation");
    document
      .getElementsByClassName("current")[0]
      .classList.remove("spinCurrent-animation");

    props.setPreventClick(false);
  };

  return (
    <div
      style={{
        "--x": props.index + (props.up ? -1 : 1),
        "--sizeScale": sizeScale,
      }}
      id="arrow"
    >
      <button
        disabled={props.preventClick}
        style={{ "--up": props.up ? 1 : -1 }}
        onClick={
          props.up
            ? () => {
                slide(true);
              }
            : () => {
                slide(false);
              }
        }
      >
        <img src={Arrow_Icon} />
      </button>
    </div>
  );
}

function Team() {
  //Number of displayed people above or below center;
  const [active, setActive] = useState(0);
  const [preventClick, setPreventClick] = useState(false);

  const memberArray = useTeamData();

  useEffect(() => {
    setActive(Math.round((memberArray.length - 1) / 2))
  }, [memberArray])

  // Check if memberArray is empty or null to determine if data is loading
  if (!memberArray || memberArray.length === 0) {
    // Data is loading, render a loading indicator
    return <div>Loading...</div>;
  }

  

  var TeamCards = [
    <Arrow
      preventClick={preventClick}
      setPreventClick={setPreventClick}
      index={displaySide}
      up={true}
      active={active}
      setActive={setActive}
    />,
    ...memberArray.map((member, index) => {
      let position = Math.abs(active - index);
      let above = 1;
      if (active > index) above = -1;

      if (active > memberArray.length - 1 - displaySide) {
        //Where member.length - displaySide < active < member.length
        let extraRange = displaySide - (memberArray.length - 1 - active);
        if (index < extraRange) {
          position = displaySide - extraRange + index + 1;
          above = 1;
        }
      } else if (active < displaySide) {
        //Where displayside > active > 0
        let extraRange = displaySide - active;
        if (index > memberArray.length - 1 - extraRange) {
          position = active + memberArray.length - index;
          above = -1;
        }
      }

      return (
        <TeamCard
          member={member}
          index={index}
          current={active - index == 0}
          size={sizeScale * (1 - (1 * position) / (displaySide * 2 + 1))}
          position={above * position}
          hide={position > displaySide - 2}
          disable={position > displaySide}
          active={active}
          setActive={setActive}
          preventClick={preventClick}
          setPreventClick={setPreventClick}
        />
      );
    }),
    <Arrow
      preventClick={preventClick}
      setPreventClick={setPreventClick}
      index={-displaySide}
      up={false}
      active={active}
      setActive={setActive}
    />,
  ];

  return (
    <>
      <Navbar />
      <div className="page-introduction">
        <PageIntro title={TeamText.title} text={TeamText.text} page="team" />
      </div>
      <div className="page-component">
        <div className="page-team">
          <div className="page-team-container">
            <div className="page-team-second">{TeamCards}</div>
            {<TeaCard index={active} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Team;
