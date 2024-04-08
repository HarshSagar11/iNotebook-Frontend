import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

const HomePage = () => {
  return (
    <>
    <div className="container my-3">
      <AddNote/>
    </div>
    <div className="container">
      <Notes/>
    </div>
    </>
  )
}

export default HomePage
