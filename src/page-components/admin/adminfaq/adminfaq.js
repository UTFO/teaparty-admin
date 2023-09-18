import React from "react";
import AdminNavbar from "../components/navbar/nav";
import Container from "../components/container/container";
import SmallContainer from "../components/smallContainer/smallContainer";
import { useState, useEffect, useRef, useCallback } from "react";
import { deleteFaq, getFaq, newFaq, updateFaq } from "../../../api/faq";

import {
  ScrollContainer,
  ListContainer,
} from "../components/scrollContainer/scrollContainer.js";
import NewModal from "../components/modal/addingModal";
import DeletePrompt from "../components/modal/deletePrompt";

const AdminFaq = () => {
  const [FAQs, setFAQs] = useState([]);
  const [data, setData] = useState();
  // Function to preload event highlights
  const preloadFAQ = () => {
    getFaq().then((data) => {
      var tempFAQs = [];
      data.map((info) => {
        // Convert the binary data to a Base64-encoded string
        tempFAQs = [
          ...tempFAQs,
          { id: info._id, question: info.question, answer: info.answer },
        ];
      });

      setFAQs(tempFAQs);
    });
  };

  const handleFaqUpdate = (index) => {
    setEditIndex(index);
    setEditOpen(true);
  };

  const initialDeleteHandler = (index) => {
    setEditIndex(index);
    setDeleteOpen(true);
  }

  const handleFaqDelete = () => {
    deleteFaq(FAQs[editIndex].id);
    setFAQs((prev) => {
      const updatedFAQs = [...prev];
      updatedFAQs.splice(editIndex, 1);
      return updatedFAQs;
    })
  }

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== "true") {
      window.location.href = "/admin";
    }
    preloadFAQ();
  }, []);


  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const [questionText, setQuestionText] = useState();
  const [answerText, setAnswerText] = useState();

  useEffect( () => {
    if (editIndex || editIndex === 0) {
      setFAQs((prevFAQs) => {
      const newFaqs = [...prevFAQs];
      newFaqs[editIndex].question = questionText;
      newFaqs[editIndex].answer = answerText;
      return newFaqs;
    })
    }
  }, []);

  const [editData, setEditData] = useState({edit: false})
  const editFaq = (index) => {
    const data = FAQs[index]
    setEditData({edit: true, data: data})
    setOpen(true)
  }
  const [open, setOpen] = useState(false)
  return (
    <div>
      <AdminNavbar />

      <Container text="Modify FAQ">
        <SmallContainer
          title="Manage Questions & Answers"
          subtitle="Click on the pencil icon to edit, plus icon to add, and trash icon to delete"
          width={95}
        >
          <ScrollContainer handleOpen={() => {setNewOpen(true)}}> 
            {/* Insert list of event highlights here as a ListContainer */}
            {FAQs.map((faq, index) => {
              return (
                <ListContainer
                  title={faq.question}
                  answer={faq.answer}
                  deleteFunction={() => {initialDeleteHandler(index)}}
                  editFunction={() => {editFaq(index)}}
                />
              );
            })}
          </ScrollContainer>
          <NewFaqModal open = {newOpen} setOpen = {setNewOpen}></NewFaqModal>

          {deleteOpen && (<DeletePrompt
            open = {deleteOpen}
            setOpen = {setDeleteOpen}
            deleteFunction = {() => {handleFaqDelete()}}
          />)}
        
          {open && <FAQModal open={open} setOpen={setOpen} editData={editData}/>}
        </SmallContainer>
      </Container>
    </div>
  );
};

const FAQModal = (props) => {
  const questionRef = useRef(null)
  const answerRef = useRef(null)
  useEffect(() => {
    const timeout = setTimeout(() => {
    if (props.editData.edit) {
      console.log(props.editData.data)
      questionRef.current.value = props.editData.data.question.toString()
      answerRef.current.value = props.editData.data.answer.toString()
    }}, 0)
    return () => clearTimeout(timeout)
  },[])
  const handleClose = () => {
    props.setOpen(false);
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (props.editData.edit)
      updateFaq(props.editData.data.id, questionRef.current.value, answerRef.current.value)
    else
      newFaq(questionRef.current.value, answerRef.current.value)
    handleClose()
    })
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
          }}>Question</p>
          <div style={{
          width: "100%",
          flex: 1,
          }}>
            <input type="text" ref={questionRef} style={{
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
            }}>Answer</p>
          <textarea  ref={answerRef} style={{
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
    </NewModal>
  )
}

export default AdminFaq;
