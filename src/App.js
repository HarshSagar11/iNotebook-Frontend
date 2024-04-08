import "./App.css";
import React, { useState } from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import About from "./component/About";
import HomePage from "./component/HomePage";
import NoteContext from "./context/notes/NoteContext";
import Login from "./component/Login";
import Signup from "./component/Signup";

const host = "http://localhost:5001"

const App = () => {
  const [notes, setnotes] = useState([]);

  const [authToken, setauthToken] = useState(localStorage.getItem('auth'))

  const getAllNotes = async () => {
    await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token" : authToken
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success){
          setnotes(data.notes);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addNote = async (title, description, tag) => {

    await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      "auth-token": authToken
      },
      body: JSON.stringify({title, description, tag})
      }).then((res)=>res.json())
      .then((data)=>{
        console.log(data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editNote = async(id,title, description, tag)=>{
    await fetch(`${host}/api/notes/updatenote/${id}`,{
      method : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
        },
        body : JSON.stringify({title, description, tag})
    }).then((res)=>res.json()).then((data)=>{
      console.log(data)
    }).catch((error)=>{
      console.log(error);
    })
  }

  const deleteNote = async(id)=>{
    await fetch(`${host}/api/notes/deletenote/${id}`,{
      method : "Delete",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token" : authToken
      },
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data)
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, getAllNotes, deleteNote, editNote, setauthToken, authToken }}>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </Router>
    </NoteContext.Provider>
  );
};
export default App;
