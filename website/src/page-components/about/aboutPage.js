import "./aboutPage.css";
import { useState, useEffect, useRef } from "react";

import { AboutText } from "../page-introductions/imports.js";

import Paper from "./images/paper.png";
import PageIntro from "../page-introductions/PageIntro.js";
import { Navbar, Footer } from "../imports.js";
import { getAbout } from "../../api/about";

var height = 80;
var width = 30;

function Tab(props) {
  return (
    <div
      className="about-tab"
      id={props.active ? "active" : "not-active"}
      onClick={() => {
        props.setSectionActive(props.index);
      }}
    >
      <p>{props.section["name"]}</p>
    </div>
  );
}

function Page(props) {
  var string = props.section["text"].split(/(\n)|({+.*}+)/);

  var imageMatch = /{(.*)}/;

  var htmlString = [];

  for (let i = 0; i < string.length; i++) {
    if (string[i] == null) continue;
    var imageMatches = string[i].match(imageMatch);
    console.log(imageMatches);

    if (imageMatches != null) {
      htmlString[i] = (
        <img
          id="page-about-page-image"
          src={require(props.section[imageMatches[1]])}
        />
      );
    } else {
      htmlString[i] = <p>{string[i]}</p>;
    }
  }

  return (
    <>
      <h2>{props.section["name"]}</h2>
      <div className="page-about-text">
        {htmlString.map((text) => {
          return text;
        })}
      </div>
    </>
  );
}

function About() {
  const [sectionActive, setSectionActive] = useState(0);
  const [sectionInfo, setSectionInfo] = useState([]);
  useEffect(() => {
    getAbout().then((data) => {
      setSectionInfo(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-introduction">
        <PageIntro title={AboutText.title} text={AboutText.text} page="about" />
      </div>
      <div className="page-component">
        <div
          className="page-about"
          style={{ "--height": height + "vh", "--width": width + "vw" }}
        >
          <div className="page-about-tabs">
            {sectionInfo.map((section, index) => {
              return (
                <Tab
                  section={section}
                  index={index}
                  active={index == sectionActive}
                  setSectionActive={setSectionActive}
                />
              );
            })}
          </div>
          <div className="page-about-menu">
            <img src={Paper} />
            <div className="page-about-page">
              {sectionInfo.map((section, index) => {
                if (sectionActive == index)
                  return <Page section={section} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
