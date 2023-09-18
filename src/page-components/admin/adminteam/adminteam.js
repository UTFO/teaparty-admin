import React, { useState, useEffect, useRef, useCallback } from "react";
import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";
import SmallContainer from "../components/smallContainer/smallContainer";
import { deleteTeam, getTeam, newTeam, updateTeam } from "../../../api/team";

import HorizontalScrollContainer from "../components/scrollContainer/horizontalScrollContainer";
import TeamListContainer from "../components/scrollContainer/teamListContainer";
import NewModal from "../components/modal/addingModal";
import DeletePrompt from "../components/modal/deletePrompt";
import { uploadFile, deleteFile } from "../../../api/images";

import { fileNameToSrc } from "../../../helper";

const AdminTeam = () => {
  const [Teams, setTeams] = useState([]);
  const [editData, setEditData] = useState({
    edit: false,
  })
  const preloadTeam = () => {
    getTeam().then((data) => {
      var tempTeams = [];
      data.map((info) => {
        // Convert the binary data to a Base64-encoded string
        tempTeams = [
          ...tempTeams,
          { id: info._id, name: info.name, message: info.message, image: info.image, role: info.role, linkedin: info.linkedin, instagram: info.instagram },
        ];
      });

      setTeams([...tempTeams]);
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== "true") {
      window.location.href = "/admin";
    }
    preloadTeam();
  }, []);

  const handleInitialDelete = (index) => {
      setEditIndex(index);
      setDeleteOpen(true);
  }

  const handleTeamDelete = () => {
    deleteTeam(Teams[editIndex].id);
    setTeams((prev) =>{
      const updatedTeams = [...prev];
      updatedTeams.splice(editIndex, 1);
      return updatedTeams;
    });
  }

  const [newOpen, setNewOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const editTeam = (index) => {
    const data= Teams[index]
    setEditData({
      edit: true,
      data: data
    })
    setOpen(true)
  }
  const [open, setOpen] = useState(false)
  
  return (
    <div>
      <AdminNavbar />

      <Container text="Modify Team">
        <SmallContainer
          title="Manage Your Team Members"
          subtitle="Click on the pencil icon to edit, plus icon to add, and trash icon to delete"
          width={95}
        >
          <HorizontalScrollContainer handleOpen={() => {setNewOpen(true)}}>
            {/* Insert list of event highlights here as a ListContainer */}
            {Teams.map((team, index) => {
              return (
                <TeamListContainer
                  image = {team.image}
                  name = {team.name}
                  text={team.message}
                  deleteFunction={() => {handleInitialDelete(index)}}
                  editFunction={() => {editTeam(index)}}
                />
              );
            })}
          </HorizontalScrollContainer>
          {deleteOpen && (<DeletePrompt
            open = {deleteOpen}
            setOpen = {setDeleteOpen}
            deleteFunction = {() => {handleTeamDelete()}}
          />)}
          {open && <NewTeamModal open={open} setOpen={setOpen} editData={editData} setEditData={setEditData}/>}
        </SmallContainer>
      </Container>
    </div>
  );

};

const NewTeamModal = (props) => {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [message, setMessage] = useState("")
  const [instagram, setInstagram] = useState("")
  const [linkedin, setLinkedin] = useState("")

  const [oldImage, setOldImage] = useState({raw: "", full: ""})
  useEffect(() => {
    if (props.editData.edit) {
      
      setOldImage({
        raw: props.editData.data.image ?? "",
        full: props.editData.data.image ? fileNameToSrc(props.editData.data.image) : ""
      })

      setName(props.editData.data.name)
      setRole(props.editData.data.role)
      setMessage(props.editData.data.message)
      setInstagram(props.editData.data.instagram)
      setLinkedin(props.editData.data.linkedin)
      setImageUrl(props.editData.data.image ? fileNameToSrc(props.editData.data.image) : undefined)
      console.log(props.editData)
    }
    
  }, [])
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
  const handleClose = () => {
    setFile(null)
    setImageUrl(null)
    props.setOpen(false)
    console.log("closed")
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (props.editData.edit && oldImage.full === imageUrl) {
      // case 1: no new image uploaded
      updateTeam(
        props.editData.data.id,
        name,
        role,
        oldImage.raw,
        message,
        linkedin,
        instagram        
      )
      props.setEditData({
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
    console.log(fileName)
    console.log("submitted")

    if (props.editData.edit) { // case 2: new image uploaded
      updateTeam(
        props.editData.data.id,
        name,
        role,
        fileName,
        message,
        linkedin,
        instagram        
      )
      deleteFile(oldImage.raw)
      props.setEditData({
        edit: false,
      })
    }
    else{
      newTeam(
        name,
        role,
        fileName,
        message,
        linkedin,
        instagram        
      )
    }    
    handleClose()
  })

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  
  return (
    <NewModal open={props.open} setOpen={props.setOpen} >
      <div
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vh",
          backgroundColor: "white",
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          padding: 20,
          maxWidth: '1000px'
        }}>
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "80%"
        }}>
          <p style={{
            marginTop: 20,
            marginBottom: 0,
            marginLeft: "2vw",
            fontFamily: "Oxygen, sans-serif",
            fontSize: 20,
          }}>Member Avatar</p>
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
          <div style={{
            alignSelf: "center",
            height: 40,
            width: "80%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img src={"/linkedin.png"} style={{
              height: "80%",
              aspectRatio: "1/1",
              marginRight: 5,
            }}/>
            <input type="text" value={linkedin} style={{
                width: "62%",
                height: 20,
                borderRadius: 5,
                border: "solid 3pt #DEDEDE",
                paddingLeft: 5,
                fontSize: 16,
              }}
              onChange={(e) => {setLinkedin(e.target.value)}} 
            /> 

          </div>
          <div style={{
            alignSelf: "center",
            height: 40,
            width: "80%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img src={"/instagram.png"} style={{
              height: "80%",
              aspectRatio: "1/1",
              marginRight: 5,
            }}/>
            <input type="text" value={instagram} style={{
              width: "62%",
              height: 20,
              borderRadius: 5,
              border: "solid 3pt #DEDEDE",
              paddingLeft: 5,
              fontSize: 16,
              }}
              onChange={(e) => {setInstagram(e.target.value)}} /> 
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
          }}>Member Name</p>
          <div style={{
            width: "100%",
            flex: 1,
          }}>
            <input type="text" value={name} style={{
              width: "62%",
              height: 33,
              borderRadius: 5,
              border: "solid 3pt #DEDEDE",
              paddingLeft: 5,
              fontSize: 16,
            }}
              onChange={(e) => {setName(e.target.value)}} /> 
          </div>
          <p style={{
            fontFamily: "Oxygen, sans-serif",
            fontSize: 20,
            marginTop: 0,
            marginBottom: 8,
          }}>Position</p>
          <div style={{
            width: "100%",
            flex: 1,
          }}>
            <input type="text" value={role} style={{
              width: "62%",
              height: 33,
              borderRadius: 5,
              border: "solid 3pt #DEDEDE",
              paddingLeft: 5,
              fontSize: 16,
              }}
              onChange={(e) => {setRole(e.target.value)}} 
            /> 
          </div>
          <p style={{
            fontFamily: "Oxygen, sans-serif",
            fontSize: 20,
            marginTop: 0,
            marginBottom: 8,
          }}>About</p>
          <div style={{
            width: "100%",
            flex: 2,
          }}>
            <textarea value={message} style={{
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
              onChange={(e) => {setMessage(e.target.value)}}
            />
          </div>
        </div>
        <button onClick={handleSubmit} className={"admin-submit-hover"} style={{
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
  )
}


export default AdminTeam;