import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote, getAllNotes} = context;
  const { note, showModal } = props;
  
  return (
    <div className="col-3">
      <div className="card my-3" style={{height: "200px"}}>
        <div className="card-header">
          <h5 className="card-title">{note.title}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">{note.description}</p>
        </div>
        <div className="card-footer">
          <i className="fa-solid fa-trash-can" onClick={async()=>{await deleteNote(note._id); getAllNotes()}}></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{showModal(note._id)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
