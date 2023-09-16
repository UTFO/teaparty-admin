import React, { useState, useEffect, useRef, useCallback } from "react";
import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";
import SmallContainer from "../components/smallContainer/smallContainer";
import { getAbout, newAbout, updateAbout } from "../../../api/about";

import HorizontalScrollContainer from "../components/scrollContainer/horizontalScrollContainer";
import AboutListContainer from "../components/scrollContainer/aboutListContainer";
import NewModal from "../components/modal/addingModal";

const AdminAbout = () => {
  const [Abouts, setAbouts] = useState([]);
  const [ModalData, setModalData] = useState({
    edit: false,
  })

  const preloadAbout = () => {
    getAbout().then((data) => {
      var tempAbouts = [];
      data.map((info) => {
        // Convert the binary data to a Base64-encoded string
        tempAbouts = [
          ...tempAbouts,
          { _id: info._id, name: info.name, text: info.text },
        ];
      });

      setAbouts(tempAbouts);
    });
  };

  const editAbout = (index) => {
    setModalData({
      edit: true,
      data: Abouts[index]})
    setOpenModal(true)
  }

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== "true") {
      window.location.href = "/admin";
    }
    preloadAbout();
  }, []);

  // controlling the opening and closing of the modal for adding new about tabs
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <AdminNavbar />

      <Container text="Modify About">
        <SmallContainer
          title="Manage Information About Your Club"
          subtitle="Click on the pencil icon to edit, plus icon to add, and trash icon to delete"
          width={95}
        >
          <HorizontalScrollContainer
            handleOpen={() => {
              setOpenModal(true)
              setModalData({
                edit: false,
              })
            }}
          >
            {/* Insert list of event highlights here as a ListContainer */}
            {Abouts.map((about, index) => {
              return (
                <AboutListContainer
                  name={about.name}
                  text={about.text}
                  editFunction={() => editAbout(index)}
                  deleteFunction={() => {}}
                />
              );
            })}
          </HorizontalScrollContainer>
          {openModal && <AboutTabModal open={openModal} setOpen={setOpenModal} data={ModalData}/>}
        </SmallContainer>
      </Container>
    </div>
  );

};

const AboutTabModal = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  }
  const [newData, setNewData] = useState({
    name: "",
    text: "",
  })

  const data = props.data

  useEffect(() => {
    if (data.edit) {
      setNewData({
        name: data.data.name,
        text: data.data.text,
      })

    }
    console.log(data)
  }, [])
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    console.log("submitted")
    if (data.edit)
      updateAbout(data.data._id, newData.name, newData.text)
    else
      newAbout(newData.name, newData.text)
    handleClose()
    })

  return (<NewModal open={props.open} setOpen={props.setOpen}>
    <div style={{
      position: "absolute",
      width: "60vw",
      height: "75vh",
      backgroundColor: "white",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: 20,
      maxWidth: '1000px',
      justifyContent: "flex-start",
      gap: 5
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        width: "70%",
        height: "15%",
        paddingRight: "20%",
        alignSelf: "center",
        paddingTop: 10,
      }}>
        <p style={{
          fontFamily: "Oxygen, sans-serif",
          fontSize: 20,
          margin: 8,
          marginLeft: 0,
        }}>Tab Title</p>
        <div style={{
        width: "100%",
        flex: 1,
        }}>
          <input type="text" value={newData.name} style={{
            width: "100%",
            height: 33,
            borderRadius: 5,
            border: "solid 3pt #DEDEDE",
            paddingLeft: 5,
            fontSize: 16,
          }}
            onChange={(event) => { setNewData((newData) => {
              return {
              name: event.target.value,
              text: newData.text,
            }})
            }} /> 
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        width: "90%",
        height: "60%",
        alignSelf: "center",
        paddingTop: 10,
      }}>
        <p style={{
            fontFamily: "Oxygen, sans-serif",
            fontSize: 20,
            marginBottom: 8,
          }}>Text</p>
        <textarea  value={newData.text} style={{
          width: "100%",
          height: "90%",
          borderRadius: 5,
          border: "solid 3pt #DEDEDE",
          alignItem: "flex-start",
          padding: 5,
          resize: "none",
          fontFamily: "Roboto",
          fontSize: 16,
        }}
          onChange={(event) => { setNewData((newData) => {
            return {
            name: newData.name,
            text: event.target.value,
          }})
          }} />
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
  </NewModal>)
}


export default AdminAbout;
