import React from "react";
import "./adminhome.css";

import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";
import SmallContainer from "../components/smallContainer/smallContainer";

import { uploadFile, deleteFile } from "../../../api/images";

import {
  ScrollContainer,
  ListContainer,
} from "../components/scrollContainer/scrollContainer.js";

import { useState, useEffect, useRef, useCallback } from "react";
import { getLinks, updateLinks } from "../../../api/links";
import { getHome, newHome, deleteHome, updateHome } from "../../../api/home";
import NewModal from "../components/modal/addingModal";
import DeletePrompt from "../components/modal/deletePrompt";

import { fileNameToSrc } from "../../../helper";

function InputField(props) {
  return (
    <div style={{ marginBottom: 40, width: "100%" }}>
      <p style={{ fontWeight: 400, fontSize: 20, margin: 0, marginBottom: 10 }}>
        {props.prompt}
      </p>
      <input
        style={{
          backgroundColor: "#FCFCFC",
          borderWidth: "3pt",
          borderColor: "#DEDEDE",
          borderStyle: "solid",
          borderRadius: 20,
          padding: 8,
          width: "100%",
          boxSizing: "border-box",
          fontFamily: `'Bellota', cursive`,
          fontSize: 20,
        }}
        type="text"
        onChange={(event) =>
          props.function((prev) => ({
            ...prev,
            [props.property]: event.target.value,
          }))
        }
        placeholder="Insert text here..."
        value={props.preload}
      />
    </div>
  );
}

const AdminHome = () => {
  const [form, setForm] = useState({ formLink: "", instaLink: "", email: "" });
  const [events, setEvents] = useState([{}]);

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null)
  //determines if the modal is open or not
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false)

  const [edit, setEdit] = useState({
    edit: false,
  })
  // Function to save input values
  const submitForm = async () => {
    updateLinks(
      form["id"],
      form["formLink"],
      form["email"],
      form["instaLink"]
    )
  };

  // Function to handle file and store it to file state
  const handleFileChange = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
    const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
  };

  // Function to preload form values
  const preloadForm = () => {
    getLinks().then((data) => {
      setForm({
        formLink: data[0]["signup"],
        instaLink: data[0]["instagram"],
        email: data[0]["email"],
        id: data[0]["_id"],
      });
    });
  };

  // Function to preload event highlights
  const preloadEvents = () => {
    getHome().then((data) => {
      var tempEvents = [];
      data.map((info) => {
        // Convert the binary data to a Base64-encoded string
        tempEvents = [
          ...tempEvents,
          { header: info.header, text: info.text, image: info.image, id: info._id},
        ];
      });
      setEvents(tempEvents);
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== "true") {
      window.location.href = "/admin";
    }
    preloadForm();
    preloadEvents();
    setImageUrl(null)
  }, []);
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")


  const handleClose = () => {
    setFile(null)
    setOpen(false)
    preloadEvents();
  }

  const handleInitialDelete = (index) => {
    setEditIndex(index);
    setDeleteOpen(true);
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (edit.edit && edit.image === imageUrl) {
      // case 1: no new image uploaded
      updateHome(edit.id, eventTitle, eventDescription, edit.imageRaw)
      setEdit({
        edit: false,
      })
      handleClose()
      return;
    }
    
    if (!file) {
      alert("Please upload a picture!")
      return
    }
    const fileName = await uploadFile(file)
    
    if (edit.edit) { // case 2: new image uploaded
      updateHome(edit.id, eventTitle, eventDescription, fileName)
      deleteFile(edit.imageRaw)
      setEdit({
        edit: false,
      })
    }
    else{
      newHome(eventTitle, eventDescription, fileName)
    }    
    handleClose()
  })

  const editEvent = (index) => {
    const data = events[index]
    setEventTitle(data.header)
    setEventDescription(data.text)
    setImageUrl(fileNameToSrc(data.image))
    setEdit({
      edit: true,
      id: data.id,
      image: fileNameToSrc(data.image),
      imageRaw: data.image
    })
    setOpen(true)
  }
  const removeEvent = (index) => {
    deleteFile(events[index].image)
    deleteHome(events[index].id)
    setEvents((prev) => {
      const updatedEvents = [...prev];
      updatedEvents.splice(editIndex, 1);
      return updatedEvents;
    })
  }

  return (
    <div>
      <AdminNavbar />

      <Container text="Modify Home">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: 80,
          }}
        >
          <SmallContainer
            title="Manage Event Highlights"
            subtitle="Click on the pencil icon to edit, plus icon to add, and trash icon to delete"
            width={50}
          >
            <ScrollContainer handleOpen={() => {setOpen(true); setEdit({edit: false}); setEventTitle(""); setEventDescription(""); setImageUrl("")}}>
              {/* Insert list of event highlights here as a ListContainer */}
              {events.map((event, index) => {
                return (
                  <ListContainer
                    image={event.image}
                    title={event.header}
                    deleteFunction={() => {handleInitialDelete(index)}}
                    editFunction={() => {editEvent(index)}}
                  />
                );
              })}
            </ScrollContainer>
          </SmallContainer>
          <form onSubmit={handleSubmit}>
          {open && <NewModal open={open} setOpen={setOpen} >
              <div
                style={{
                  position: "absolute",
                  width: "60vw",
                  height: "75vh",
                  backgroundColor: "white",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 20,
                  maxWidth: '1000px'
                }}>
                <div style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                }}>
                  <p style={{
                    marginTop: 0,
                    marginBottom: 21,
                    marginLeft: "2vw",
                    fontFamily: "Oxygen, sans-serif",
                    fontSize: 20,
                  }}>Event Image</p>
                  <div style={{
                    alignSelf: "center",
                    width: "60%",
                    aspectRatio: "1/1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    backgroundColor: "#FCFCFC",
                    border: "solid 3pt #DEDEDE",
                  }}>
                    <label htmlFor="imageAdding" style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer"
                    }}>
                      {imageUrl ? <img src={imageUrl} style={{
                      width: "60%",
                      height: "60%",
                    }}/> :<img src={"/plusButton.png"} style={{
                      width: "60%",
                      height: "60%",
                      opacity: 0.3,
                    }}/>}
                    </label>
                    <input type="file" accept=".jpeg, .jpg, .png" onChange={handleFileChange} style={{
                    display: "none",
                  }} id="imageAdding"/>
                  </div>
                </div>
                <div style={{
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "flex-start",
                  height: "75%",
                  alignSelf: "flex-start"
                }}>
                  <p style={{
                    fontFamily: "Oxygen, sans-serif",
                    fontSize: 20,
                    marginBottom: 8,
                  }}>Event Title</p>
                  <div style={{
                    width: "100%",
                    flex: 1,
                  }}>
                    <input type="text" value={eventTitle} style={{
                      width: "62%",
                      height: 33,
                      borderRadius: 5,
                      border: "solid 3pt #DEDEDE",
                      paddingLeft: 5,
                      fontSize: 16,
                    }}
                      onChange={(e) => {setEventTitle(e.target.value)} } /> 
                  </div>
                  <p style={{
                    fontFamily: "Oxygen, sans-serif",
                    fontSize: 20,
                    marginBottom: 8,
                  }}>Description</p>
                  <div style={{
                    width: "100%",
                    flex: 3,
                  }}>
                    <textarea value={eventDescription} style={{
                      width: "80%",
                      height: "100%",
                      borderRadius: 5,
                      border: "solid 3pt #DEDEDE",
                      alignItem: "flex-start",
                      padding: 5,
                      resize: "none",
                      fontFamily: "Roboto",
                      fontSize: 14,
                    }} 
                    onChange={(e) => {
                      setEventDescription(e.target.value)
                    }}/>
                  </div>
                </div>
                <button onClick={handleSubmit} className={"admin-submit-hover"} style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 50,
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
          </NewModal>}
          {deleteOpen && (<DeletePrompt open = {deleteOpen} setOpen = {setDeleteOpen} deleteFunction = {() => {removeEvent(editIndex)}} />)}
          </form>
          <SmallContainer
            title="Edit Links"
            subtitle="Change the sign-up link and instagram or email!"
            width={35}
          >
            <div
              style={{
                paddingLeft: 20,
                minHeight: "60vh",
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <InputField
                preload={form["formLink"]}
                prompt="Sign-Up Form"
                property="formLink"
                function={setForm}
              />
              <InputField
                preload={form["instaLink"]}
                prompt="Instagram Link"
                property="instaLink"
                function={setForm}
              />
              <InputField
                preload={form["email"]}
                prompt="Email"
                property="email"
                function={setForm}
              />
              <button
                className="admin-submit-hover"
                onClick={() => submitForm()}
              >
                Save
              </button>
            </div>
          </SmallContainer>
        </div>
      </Container>
    </div>
  );
}

export default AdminHome;
