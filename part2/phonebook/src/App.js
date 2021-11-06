import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from './services/persons'

const Filter = (props) =>{
  return(
    <div>filter shown with<input value={props.searchString} onChange={props.handleSearchString}/></div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const PersonForm = (props) =>{
  return(
    <form onSubmit={props.addPerson}>
    <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
    <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = (props) =>{
  return(
    <>
    {props.personsToShow.map(person => <Person key={person.id} person={person} onClick={props.onClick}/>
                             )
     }
    </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  console.log('after rendering: persons are: ',persons)

  // dealing with form submitting
  const addPerson = (event) =>{
    event.preventDefault()
    let adding = true
    let updating = false
    persons.forEach(function(object){
      if(object.name === newName){
        adding = false
        const repeatId = object.id
        updating = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
        if(updating){
          const person = persons.find(p=>p.id===repeatId)
          const changedPerson = {...person, number: newNumber}
          personService
          .update(repeatId, changedPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id !== repeatId ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          }
    }
    })
    if(adding){
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson=(event)=>{
    const deleteId = event.target.value
    const message = `Delete ${event.target.name} ?`
    const result = window.confirm(message);
    if(result){

    const copytest = {...persons}
    const arr = Object.values(copytest)

    let index = -1

    for(let i =0; i<arr.length;i++){
      if(arr[i].id==deleteId){
        index=i
      }
    }
    arr.splice(index,1)

    personService
    .deletePerson(deleteId)
    .then(response=>{
      setPersons(arr)
      })
    .catch(error => {
      setErrorMessage(
        `Information of '${event.target.name}' was already removed from server`
      )
      setPersons(arr)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    }
    }
 

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchString = (event) =>{
    console.log(event.target.value)
    setSearchString(event.target.value)
  }
  // filtering person list after user typing some keyword
  const personsToShow = persons.filter(person => person.name.includes(searchString)===true)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter searchString={searchString} 
              handleSearchString={handleSearchString}
      />
      
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onClick={deletePerson}/>
    </div>
  )
}

export default App