import React from "react";
import "./adminevents.css";
import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";
import SmallContainer from "../components/smallContainer/smallContainer";
import { useState, useEffect, useRef, useCallback } from "react";
import { getEvent, newEvent } from "../../../api/event";

import {
  ScrollContainer,
  ListContainer,
} from "../components/scrollContainer/scrollContainer.js";

import NewModal from "../components/modal/addingModal";
import { SettingsPowerRounded } from "@mui/icons-material";


const AdminEvents = () => {
  const [events, setEvents] = useState([]);

  // Function to preload event highlights
  const preloadEvents = () => {
    getEvent().then((data) => {
      var tempEvents = [];
      data.map((info) => {
        // Convert the binary data to a Base64-encoded string
        tempEvents = [
          ...tempEvents,
          {
            title: info.title,
            address: info.address,
            date: info.date,
            type: info.type,
          },
        ];
      });

      setEvents(tempEvents);
    });
  };

  useEffect(() => {
    preloadEvents();
  }, []);

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const eventTitleRef = useRef("")
  const eventTypeRef = useRef("")
  const eventDateRef =  useRef("")
  const eventAddressRef = useRef("")

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    console.log("submitted")
    await newEvent(eventTitleRef.current.value, eventTypeRef.current.value, eventDateRef.current.value, eventAddressRef.current.value)
    handleClose()
    })

  return (
    <div>
      <AdminNavbar />

      <Container text="Modify Events">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SmallContainer
            title="Manage Upcoming Events"
            subtitle="Click on the pencil icon to edit, plus icon to add, and trash icon to delete"
            width={45}
          >
            <ScrollContainer handleOpen={() => {setOpen(true)}}>
              {/* Insert list of event highlights here as a ListContainer */}
              {events.map((event) => {
                return (
                  <ListContainer
                    name={event.title}
                    date={event.date}
                    time=""
                    editFunction={() => {}}
                    deleteFunction={() => {}}
                  />
                );
              })}
            </ScrollContainer>
            <NewModal open={open} setOpen={setOpen} >
              <div
                style={{
                  position: "absolute",
                  width: "50vw",
                  height: "40vh",
                  backgroundColor: "white",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 20,
                  maxWidth: '800px',
                  minHeight: '375px',
                }}>
                  <div
                    style={{
                      width: "90%",
                      height: "30%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 20,
                      flex: 1,
                    }}>
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "flex-start",
                        height: "100%",
                        width: "45%",
                        alignSelf: "flex-start"
                      }}>
                        <p style={{
                          fontFamily: "Oxygen, sans-serif",
                          fontSize: 20,
                          margin: 8,
                          marginLeft: 0,
                        }}>Event Title</p>
                      <div style={{
                        width: "100%",
                        flex: 1,
                      }}>
                        <input type="text" ref={eventTitleRef} style={{
                          width: "100%",
                          height: 33,
                          borderRadius: 5,
                          border: "solid 3pt #DEDEDE",
                          paddingLeft: 5,
                          fontSize: 16,
                        }} /> 
                      </div>
                      </div>
                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          alignContent: "flex-start",
                          height: "75%",
                          width: "45%",
                          alignSelf: "flex-start",
                        }}>
                          <p style={{
                            fontFamily: "Oxygen, sans-serif",
                            fontSize: 20,
                            margin: 8,
                            marginLeft: 0,
                          }}>Event Type</p>
                        <div style={{
                          width: "100%",
                          flex: 1,
                        }}>
                          <input type="text" ref={eventTypeRef} style={{
                            width: "100%",
                            height: 33,
                            borderRadius: 5,
                            border: "solid 3pt #DEDEDE",
                            paddingLeft: 5,
                            fontSize: 16,
                          }} /> 
                        </div>

                      </div>

                  </div>
                  <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "flex-start",
                        width: "90%",
                        alignSelf: "center",
                        paddingTop: 10,
                        flex: 1,
                      }}>
                        <p style={{
                          fontFamily: "Oxygen, sans-serif",
                          fontSize: 20,
                          margin: 8,
                          marginLeft: 0,
                        }}>Event Address</p>
                      <div style={{
                        width: "100%",
                        flex: 1,
                      }}>
                        <input type="text" ref={eventAddressRef} style={{
                          width: "100%",
                          height: 33,
                          borderRadius: 5,
                          border: "solid 3pt #DEDEDE",
                          paddingLeft: 5,
                          fontSize: 16,
                        }} /> 
                      </div>
                    </div>
                  <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "flex-start",
                        width: "90%",
                        alignSelf: "center",
                        paddingTop: 10,
                        flex: 1,
                        marginBottom: "20%"
                      }}>
                        <p style={{
                          fontFamily: "Oxygen, sans-serif",
                          fontSize: 20,
                          margin: 8,
                          marginLeft: 0,
                        }}>Event Date</p>
                      <div style={{
                        width: "100%",
                        flex: 1,
                      }}>
                        <input type="text" ref={eventDateRef} style={{
                          width: "100%",
                          height: 33,
                          borderRadius: 5,
                          border: "solid 3pt #DEDEDE",
                          paddingLeft: 5,
                          fontSize: 16,
                        }} /> 
                      </div>
                    </div>
                      <button className={"admin-submit-hover"} onClick={handleSubmit} style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 40,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "20vw"
                      }}>Save</button>
                <button style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 30,
                    height: 30,
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    cursor: "pointer"
                  }} onClick={handleClose}>
                  <img src="/closeButton.png"  style={{
                    width: "200%",
                    aspectRatio: "1/1",
                    opacity: 0.25
                  }}/>
                </button>
              </div>
            </NewModal>
          </SmallContainer>
          <SmallContainer
            title="Check Past Events"
            subtitle="For reference. Remove if necessary"
            width={40}
          >
            <ScrollContainer>
              {/* Insert list of event highlights here as a ListContainer */}
              {/* {FAQs.map((faq) => {
                return (
                  <ListContainer
                    title={faq.question}
                    answer={faq.answer}
                    editFunction={() => {}}
                    deleteFunction={() => {}}
                  />
                );
              })} */}
            </ScrollContainer>
          </SmallContainer>
        </div>
      </Container>
    </div>
  );
};

export default AdminEvents;
