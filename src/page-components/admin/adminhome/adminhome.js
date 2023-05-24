import React from 'react'
import "./adminhome.css"

import AdminNavbar from '../components/navbar/nav'
import Container from '../components/container/container'
import SmallContainer from '../components/smallContainer/smallContainer'

import { ScrollContainer, ListContainer } from '../components/scrollContainer.js/scrollContainer'

import { useState, useEffect } from 'react'
import { getLinks, updateLinks } from '../../../api/links'
import { getHome } from '../../../api/home'

function InputField(props) {
  return (
    <div style={{marginBottom: 40, width: '100%'}}>
      <p style={{fontWeight: 400, fontSize: 20, margin: 0, marginBottom: 10}}>{props.prompt}</p>
      <input style={{backgroundColor: '#FCFCFC', borderWidth: '3pt', borderColor: '#DEDEDE', borderStyle: 'solid', borderRadius: 20, padding: 8, width: '100%', boxSizing: 'border-box', fontFamily: `'Bellota', cursive`, fontSize: 20}} 
            type='text' 
            onChange={(event) => props.function((prev) => ({...prev, [props.property]: event.target.value}))}
            placeholder="Insert text here..."
            value={props.preload}/>
    </div>
  )
}

const AdminHome = () => {

  const [form, setForm] = useState({'formLink': "", 'instaLink': "", 'email': ""});
  const [events, setEvents] = useState([{}]);

  // Function to preload form values
  const preloadForm = () => {
    
    getLinks().then((data) => {
      console.log(data[0]);
      setForm({
        'formLink': data[0]['signup'],
        'instaLink': data[0]['instagram'],
        'email': data[0]['email'],
        'id': data[0]['_id']
      })
    });

  };


  // Function to preload event highlights
  const preloadEvents = () => {
    getHome().then((data) => {
      var tempEvents = [];
      data.map((info) => {
        // Convert the binary data to a Base64-encoded string
        console.log(info.image);
        var base64Data =  Buffer.from(info.image).toString('base64');
        
        // Create a data URL using the Base64-encoded image data
        var dataURL = 'data:image/jpeg;base64,' + base64Data;
        console.log(base64Data);
        tempEvents = [...tempEvents, {header: info.header, text: info.text, image: dataURL}]
      });
      

      setEvents(tempEvents);
    })
  };

  //newHome("Example One", "TESTTT", "").then();

  // Function to save input values 
  const submitForm = async () => {
    console.log(form);
    updateLinks(form['id'], form['formLink'], form['email'], form['instaLink']).then((res) => {
      console.log(res);
    })
  }

  useEffect(() => {preloadForm(); preloadEvents()}, []);
  
  return (
    <div>
      <AdminNavbar/>

      <Container text="Modify Home">
        
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', paddingBottom: 80}}>
          <SmallContainer title="Manage Event Highlights" subtitle="Click on the pencil icon to edit, plus icon to add, and trash icon to delete" width={50}>
            <ScrollContainer>

              {/* Insert list of event highlights here as a ListContainer */}
              {events.map((event) => {
                return <ListContainer image={event.image} title={event.header} editFunction={()=>{}} deleteFunction={()=>{}} />
              })}

            </ScrollContainer>
          </SmallContainer>

          <SmallContainer title="Edit Links" subtitle="Change the sign-up link and instagram or email!" width={35}>
            <div style={{paddingLeft: 20, height: '60vh', width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
              <InputField preload={form['formLink']} prompt="Sign-Up Form" property='formLink' function={setForm}/>
              <InputField preload={form['instaLink']} prompt="Instagram Link" property='instaLink' function={setForm}/>
              <InputField preload={form['email']} prompt="Email" property='email' function={setForm}/>
              <button className="admin-submit-hover" onClick={() => submitForm()}>Save</button>
            </div>
          </SmallContainer>
        </div>
      </Container>
    </div>
  )
}

export default AdminHome