import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {

    const context  = useContext(NoteContext);
    const {addNote,getAllNotes, editNote} = context;

    const {hideModal} = props

    const [note, setnote] = useState({title : '', description : '', tag : 'Default'})

    useEffect(() => {
      if(props.noteDetail){
        setnote(props.noteDetail)
      }
      // eslint-disable-next-line
      console.log(note)
    }, [props.noteDetail])
    

    const handleFormChange = (event) =>{
        setnote({...note, [event.target.name] : event.target.value})
    }

    const onButtonClick = async (event)=>{
      console.log(note)
        event.preventDefault()
        await addNote(note.title,note.description,note.tag);
        getAllNotes()
        setnote({title : '', description : '', tag : 'Default'})
    }
    const onEditChange = async (event)=>{
      console.log(note)
        event.preventDefault()
        await editNote(props.noteDetail._id,note.title,note.description,note.tag);
        getAllNotes();
        hideModal();
    }

  return (
    <div className="row">
      <form action="">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title ? note.title : ''}
            onChange={handleFormChange}
            placeholder="Enter Title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description ? note.description : ''}
            onChange={handleFormChange}
            placeholder="Enter description"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag ? note.tag : ''}
            placeholder="Enter tag"
            onChange={handleFormChange}
          ></input>
        </div>
        {
          !props.noteDetail && 
          <button className="btn btn-primary" onClick={onButtonClick}>Save Note</button>
        }
        {
          props.noteDetail && 
          <button className="btn btn-primary" onClick={onEditChange}>Edit Note</button>
        }
      </form>
    </div>
  );
};

export default AddNote;
