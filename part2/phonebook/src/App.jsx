import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')
  const [notificationProps, setNotificatonProps] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNotificatonProps({
              message: `Updated ${returnedPerson.name}`,
              type: 'success'
            })
            setTimeout(() => {
              setNotificatonProps(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificatonProps({
            message: `Added ${returnedPerson.name}`,
            type: 'success'
          })
          setTimeout(() => {
            setNotificatonProps(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().search(keyword.toLowerCase()) !== -1)
  
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notificationProps={notificationProps} />

      <Filter keyword={keyword} handleKeywordChange={handleKeywordChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App