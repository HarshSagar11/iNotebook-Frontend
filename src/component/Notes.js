import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);

  const { notes, getAllNotes,setauthToken } = context;
  
  const [noteToEdit, setnoteToEdit] = useState({_id : ''})

  const closeModal = ()=>{
    window.$('#modalForEdit').modal('hide');
  }

  const showModal = (id) =>{
    setnoteToEdit(notes.find(ele=>ele._id === id));
    window.$('#modalForEdit').modal('show');
  }
  
  useEffect(() => {
    setauthToken(localStorage.getItem('auth'))
    getAllNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="row">
        {
          notes.length === 0 && <div><h4>No Notes Found</h4></div>
        }
        { notes.length !== 0 && notes.map((note) => {
          return <NoteItem key={note._id} note={note} showModal={showModal}/>;
        })}
      </div>
        <div className="modal" id="modalForEdit" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <AddNote key={noteToEdit._id} noteDetail={noteToEdit} hideModal={closeModal}/>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Notes;
