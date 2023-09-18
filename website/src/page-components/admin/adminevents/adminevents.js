import React from "react";
import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";
import SmallContainer from "../components/smallContainer/smallContainer";
import { useState, useEffect, useRef, useCallback } from "react";
import { deleteEvent, getEvent, newEvent, updateEvent } from "../../../api/event";

import {
  ScrollContainer,
  ListContainer,
} from "../components/scrollContainer/scrollContainer.js";

import NewModal from "../components/modal/addingModal";
import { SettingsPowerRounded } from "@mui/icons-material";
import DeletePrompt from "../components/modal/deletePrompt";


const AdminEvents = () => {
  const [events, setEvents] = useState([{}]);

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
            id: info._id
          },
        ];
      });

      setEvents(tempEvents);
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== "true") {
      window.location.href = "/admin";
    }
    preloadEvents();
  }, []);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const handleInitialDelete = (index) => {
    setEditIndex(index);
    setDeleteOpen(true);
  }

  const handleEventDelete = () => {
    deleteEvent(events[editIndex].id);
    setEvents((prev) => {
      const updatedEvents = [...prev];
      updatedEvents.splice(editIndex, 1);
      return updatedEvents;
    })
  }
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({edit: false})
  const handleClose = () => {
    setOpen(false);
  }
  const [eventTitle, setEventTitle] = useState("")
  const [eventType, setEventType] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventAddress, setEventAddress] = useState("")

  const editEvent = (index) => {
    setEditData({
      edit: true,
      data: events[index]
    })
    setOpen(true)
  }
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (editData.edit) {
      updateEvent(editData.data.id, eventTitle, eventType, eventDate, eventAddress)
      setEditData({edit: false})
    }
    else
      newEvent(eventTitle, eventType, eventDate, eventAddress)
    console.log("submitted")
    handleClose()
    })
  useEffect(() => {
    if (editData.edit) {
      setEventTitle(editData.data.title)
      setEventType(editData.data.type)
      setEventDate(editData.data.date)
      setEventAddress(editData.data.address)
    }
  }, [open])
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
            width={100}
          >
            <ScrollContainer handleOpen={() => {setOpen(true); setEditData({edit: false})}}>
              {/* Insert list of event highlights here as a ListContainer */}
              {events.map((event, index) => {
                return (
                  <ListContainer
                    name={event.title}
                    date={event.date}
                    // address={event.address}
                    time=""
                    deleteFunction={() => {handleInitialDelete(index)}}
                    editFunction={() => {editEvent(index)}}
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
                        <input type="text" value={eventTitle} style={{
                            width: "100%",
                            height: 33,
                            borderRadius: 5,
                            border: "solid 3pt #DEDEDE",
                            paddingLeft: 5,
                            fontSize: 16,
                          }}
                          onChange={(e) => {setEventTitle(e.target.value)}} 
                        /> 
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
                          <input type="text" value={eventType} style={{
                            width: "100%",
                            height: 33,
                            borderRadius: 5,
                            border: "solid 3pt #DEDEDE",
                            paddingLeft: 5,
                            fontSize: 16,
                          }}
                          onChange={(e) => {setEventType(e.target.value)}} /> 
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
                        <input type="text" value={eventAddress} style={{
                          width: "100%",
                          height: 33,
                          borderRadius: 5,
                          border: "solid 3pt #DEDEDE",
                          paddingLeft: 5,
                          fontSize: 16,
                        }}
                        onChange={(e) => {setEventAddress(e.target.value)}} /> 
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
                        <input type="text" value={eventDate} style={{
                          width: "100%",
                          height: 33,
                          borderRadius: 5,
                          border: "solid 3pt #DEDEDE",
                          paddingLeft: 5,
                          fontSize: 16,
                        }}
                        onChange={(e) => {setEventDate(e.target.value)}}/> 
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
            {deleteOpen && (<DeletePrompt
            open = {deleteOpen}
            setOpen = {setDeleteOpen}
            deleteFunction = {() => {handleEventDelete()}}
          />)}
          </SmallContainer>

        </div>
      </Container>
    </div>
  );
};

export default AdminEvents;
