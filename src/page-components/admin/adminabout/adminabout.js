import React, { useState, useEffect, useRef, useCallback } from "react";
import "./adminabout.css";
import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";
import SmallContainer from "../components/smallContainer/smallContainer";
import { getAbout, newAbout, updateAbout } from "../../../api/about";

import HorizontalScrollContainer from "../components/scrollContainer/horizontalScrollContainer";
import AboutListContainer from "../components/scrollContainer/aboutListContainer";
import NewModal from "../components/modal/addingModal";

const AdminAbout = () => {
  const [Abouts, setAbouts] = useState([{}]);

  const preloadAbout = () => {
    getAbout().then((data) => {
      var tempAbouts = [];
      data.map((info) => {
        // Convert the binary data to a Base64-encoded string
        tempAbouts = [
          ...tempAbouts,
          { name: info.name, text: info.text, id: info._id },
        ];
      });

      setAbouts(tempAbouts);
    });
  };

  


  const handleAboutUpdate = (index) => {
    setEditIndex(index);
    setEditOpen(true);
  }

  // controlling the opening and closing of the modal for adding new about tabs
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const [tabText, setTabText] = useState();
  const [descText, setDescText] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== "true") {
      window.location.href = "/admin";
    }
    preloadAbout();
  }, []);

  useEffect( () => {
    if (editIndex || editIndex === 0) {
      setAbouts((prevAbouts) => {
      const newAbouts = [...prevAbouts]
      newAbouts[editIndex].name = tabText
      newAbouts[editIndex].text = descText
      return newAbouts
    })
    }
  })
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
            handleOpen={() => setNewOpen(true)}
          >
            {/* Insert list of event highlights here as a ListContainer */}
            {Abouts.map((about, index) => {
              return (
                <AboutListContainer
                  name={about.name}
                  text={about.text}
                  editFunction={() => {handleAboutUpdate(index)}}
                  deleteFunction={() => {}}
                />
              );
            })}
          </HorizontalScrollContainer>
          <AboutTabModal open={newOpen} setOpen={setNewOpen} />
          
          {editOpen && (<EditAboutModal 
            open = {editOpen} 
            setOpen = {setEditOpen} 
            editIndex = {editIndex}
            data = {Abouts}
            setTabText={setTabText}
            setDescText={setDescText}
          />)}
        </SmallContainer>
      </Container>
    </div>
  );

};

const AboutTabModal = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    console.log("submitted")
    newAbout(tabRef.current.value, textRef.current.value)
    handleClose()
    })
  const tabRef = useRef("")
  const textRef = useRef("")
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
          <textarea placeholder="Title" ref={tabRef} style={{
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
        height: "60%",
        alignSelf: "center",
        paddingTop: 10,
      }}>
        <p style={{
            fontFamily: "Oxygen, sans-serif",
            fontSize: 20,
            marginBottom: 8,
          }}>Text</p>
        <textarea placeholder="Description" ref={textRef} style={{
          width: "100%",
          height: "90%",
          borderRadius: 5,
          border: "solid 3pt #DEDEDE",
          alignItem: "flex-start",
          padding: 5,
          resize: "none",
          fontFamily: "Roboto",
          fontSize: 16,
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


const EditAboutModal = (props) => {
  const tabRef = useRef(props.tabValue || '');
  const textRef = useRef(props.textValue || '');

  const [tabText, setTabText] = useState();
  const [descText, setDescText] = useState();
  useEffect(() => {
    setTabText(props.data[props.editIndex]?.name)
    setDescText(props.data[props.editIndex]?.text)
  }, [])
  const handleClose = () => {
    props.setOpen(false);
    props.setTabText(tabText);
    props.setDescText(descText)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateAbout(
      props.data[props.editIndex].id,
      tabRef.current.value ? tabRef.current.value : tabText,
      textRef.current.value ? textRef.current.value : descText
    )
    handleClose();
  }

  return (
    <NewModal open={props.open} setOpen={props.setOpen}>
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
          <textarea ref={tabRef} value={tabText} style={{
            width: "100%",
            height: 33,
            borderRadius: 5,
            border: "solid 3pt #DEDEDE",
            paddingLeft: 5,
            fontSize: 16,
            fontFamily: "Roboto", 
          }}
          onChange={(e) => {setTabText(e.target.value)}}/> 
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
        <textarea ref={textRef} value={descText} style={{
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
        onChange={(e) => {setDescText(e.target.value)}}/>
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
  </NewModal>
  )

}


export default AdminAbout;
