import React from "react";
import "./adminfaq.css";
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
  const [FAQs, setFAQs] = useState([{}]);

  // Function to preload event highlights
  const preloadFAQ = () => {
    getFaq().then((data) => {
      var tempFAQs = [];
      data.map((info) => {
        // Convert the binary data to a Base64-encoded string
        tempFAQs = [
          ...tempFAQs,
          { question: info.question, answer: info.answer, id: info._id},
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
                  editFunction={() => {handleFaqUpdate(index)}}
                  deleteFunction={() => {initialDeleteHandler(index)}}
                />
              );
            })}
          </ScrollContainer>
          <NewFaqModal open = {newOpen} setOpen = {setNewOpen}></NewFaqModal>
          {editOpen &&
            (<FaqEditModal open = {editOpen} 
              setOpen = {setEditOpen} 
              data = {FAQs} 
              editIndex = {editIndex} 
              setQuestionText = {setQuestionText} 
              setAnswerText = {setAnswerText}
            />)

          }

            {deleteOpen && (<DeletePrompt
            open = {deleteOpen}
            setOpen = {setDeleteOpen}
            deleteFunction = {() => {handleFaqDelete()}}
          />)}
          
          
        </SmallContainer>
      </Container>
    </div>
  );
}

//------------------------------------------------------------------------------------------------------

const NewFaqModal = (props) => {
  const questionRef = useRef("");
  const answerRef = useRef("");

  const handleClose = () => {
    props.setOpen(false);
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    console.log("submitted")
    newFaq(questionRef.current.value, answerRef.current.value)
    handleClose()
  })
  
  return(
    <NewModal open = {props.open} setOpen = {props.setOpen}>
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
                  <textarea placeholder="Enter the question here" ref={questionRef} style={{
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
                <textarea placeholder="Enter the answer here" ref={answerRef} style={{
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

//------------------------------------------------------------------------

const FaqEditModal = (props) => {
  

  const questionRef = useRef(props.questionValue || '');
  const answerRef = useRef(props.answerValue || '');

  const [questionText, setQuestionText] = useState();
  const [answerText, setAnswerText] = useState();

  useEffect( () => {
    setQuestionText(props.data[props.editIndex]?.question);
    setAnswerText(props.data[props.editIndex]?.answer);
  }, []
  )

  const handleClose = () => {
    props.setOpen(false)
    props.setQuestionText(questionText);
    props.setAnswerText(answerText);
    console.log("closed");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(questionRef.current.length === 0 || answerRef.current.length === 0){
      alert("Please enter a value for the question and answer");
      return;
    }
    console.log("submitting");
    updateFaq(
      props.data[props.editIndex]?.id,
      questionRef.current.value ? questionRef.current.value : questionText,
      answerRef.current.value ? answerRef.current.value : answerText
    ) 
    
    handleClose();
  };

  return(
      <NewModal open = {props.open} setOpen = {props.setOpen}>
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
                  <textarea value={questionText} ref={questionRef} style={{
                    width: "100%",
                    height: 33,
                    borderRadius: 5,
                    border: "solid 3pt #DEDEDE",
                    paddingLeft: 5,
                    fontSize: 16,
                  }} onChange={(e) => setQuestionText(e.target.value)} /> 
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
                <textarea value={answerText}  ref={answerRef} style={{
                  width: "100%",
                  height: "90%",
                  borderRadius: 5,
                  border: "solid 3pt #DEDEDE",
                  alignItem: "flex-start",
                  padding: 5,
                  resize: "none",
                  fontFamily: "Roboto",
                  fontSize: 16,
                }} onChange={(e) => setAnswerText(e.target.value)}/>
              </div>
              <button onClick={handleSubmit} className={"admin-submit-hover"} style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 50,
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "20vw"
                }}>Update</button>
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
};



export default AdminFaq