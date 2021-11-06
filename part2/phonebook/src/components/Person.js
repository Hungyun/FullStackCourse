import React from 'react'

const Person = ({person, onClick}) => {
    return (
        <>
        {person.name} {person.number} 
        <button name={person.name} value={person.id} onClick={onClick}>delete</button>
        <br/>
        </>
    )
  }
  
  export default Person