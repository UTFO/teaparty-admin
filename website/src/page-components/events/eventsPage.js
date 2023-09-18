import "./eventsPage.css";

import { EventsText } from "../page-introductions/imports.js";

import PageIntro from "../page-introductions/PageIntro.js";
import { Navbar, Footer } from "../imports.js";
import { getEvent } from "../../api/event";
import { useState, useEffect, useRef } from "react";

var socialColor = "#74cdef";
var teaColor = "#62ff8b";
var gameColor = "#f26c4f";
var speakerColor = "#f7941d";

//var events = require('../../data/texts/Event.json'); //To replace with the actual database

//Returns a color based on type of event
function ColorSelect(type) {
  switch (type) {
    case "social":
      return socialColor;
      break;
    case "tea":
      return teaColor;
      break;
    case "game":
      return gameColor;
      break;
    case "speaker":
      return speakerColor;
      break;
    default:
      return "blue";
  }
}

//The template for a listed event
function EventForm(props) {
  return (
    <div className="page-events-board-slot">
      <div
        className="page-events-date"
        style={{ backgroundColor: ColorSelect(props.type) }}
      >
        {props.date}
      </div>
      <div className="page-events-info">
        <p id="page-events-name" style={{ color: ColorSelect(props.type) }}>
          {props.name}
        </p>
        <p id="page-events-time">
          {props.time} | {props.address}
        </p>
      </div>
    </div>
  );
}

//Generates a list of EventForm modules
function EventGenerate(events) {
  return events.map((event) => {
    return (
      <EventForm
        name={event.name}
        date={event.date}
        time={event.time}
        address={event.address}
        type={event.type}
      />
    ); //Format subject to change
  });
}
const NoEvents = () => {
  return (
    <div className="page-events-no-events">
      No events planned...
      <br></br>
      Check back later!
    </div>
  );
};
//The main event section
function Events() {
  const [events, setEvents] = useState([]);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    getEvent().then((data) => {
      setEvents(data);
    });
  }, []);
  const eventsNotEmpty = events.length === 0 ? false : true;
  return (
    <>
      <Navbar />
      <div className="page-introduction">
        <PageIntro
          title={EventsText.title}
          text={EventsText.text}
          page="events"
        />
      </div>
      <div className="page-component">
        <div className="page-events-board">
          <div className="page-events-board-container">
            {events.length != 0 ? EventGenerate(events) : <NoEvents />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Events;
