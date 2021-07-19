import React, { useState, useEffect } from 'react'
import './style.css'
import axios from 'axios'

let defaultUrl = "http://localhost:3001/api/persons";

const AddForm = (props) => {
  return (
    <form>

      <div>
        name: <input onChange={props.handleInput} /> <br />
        number: <input onChange={props.handleNumber} />
      </div>

      <div>
        <button type="submit" onClick={props.handleAdd}>add</button>
      </div>
    </form>
  );
}

const PhoneList = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.filter(person => {
        return person.show;
      }).map(person => {
        return (<li key={person.name}>{person.name + " - " + person.number}
          <button onClick={() => { deletePerson(person.name) }}>Delete</button>
        </li>)
      })}
    </ul>
  )
}

const SearchForm = ({ handleSearch }) => {
  return (<div>
    Search <input onChange={handleSearch} />
  </div>)
}

const Notification = (({ msg, errorMsg }) => {
  console.log(msg);
  console.log(errorMsg);
  let colorClass = errorMsg ? 'red' : 'green';
  return (<h1 className={`note ${colorClass}`}>{msg}</h1>)
})


const App = () => {

  useEffect(() => {
    axios.get(defaultUrl).then(result => {
      setPersons(result.data);
    });
  }
    , [])

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0000000', show: true }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [noteMsg, setNoteMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);


  function handleInputChange(e) {
    setNewPerson({ name: e.target.value, number: newPerson.number });
  }

  function handleNumberChange(e) {
    setNewPerson({ name: newPerson.name, number: e.target.value });
  }

  function deletePerson(name) {
    let flag = window.confirm(`delete ${name}?`);
    if (!flag) {
      return;
    }
    console.log(name)
    let personToDelete = persons.find(person => {
      return person.name === name;
    })
    console.log(personToDelete)
    
    axios.delete(`${defaultUrl}/${personToDelete._id}`).then(response => {
      console.log(response);
      let newPersonsArray = [...persons];
      newPersonsArray.splice(newPersonsArray.indexOf(personToDelete), 1);
      setPersons(newPersonsArray);
    }).catch(err=>{
      createNoteMsg(`${err}`,true);
    })
  }

  function handleSearch(e) {
    let searchPerson = persons.map(person => {
      console.log(e.target.value);
      if (person.name.includes(e.target.value)) {
        person.show = true;
      } else {
        person.show = false;
      }
      return person;
    });
    console.log(searchPerson);
    setPersons(searchPerson);
  }

  function addPerson(e) {
    e.preventDefault();
    let replaceFlag = false;
    let findPerson = persons.find(person => {
      return person.name === newPerson.name
    });
    if (findPerson) {
      replaceFlag = window.confirm(`${newPerson.name} already exists, replace number?`)
      if (replaceFlag) {
        findPerson.number = newPerson.number;
        console.log(findPerson);
        axios.put(`${defaultUrl}/${findPerson._id}`, findPerson).then(response => {
          console.log(response);
          let changedArray = [...persons];
          changedArray.splice(changedArray.indexOf(findPerson), 1, response.data);
          setPersons(changedArray);
          createNoteMsg(`Updated ${findPerson.name} successfully`,false);
        })
      }
    } else {
      let newObj = { name: newPerson.name, number: newPerson.number, show: true };
      console.log(newObj);
      axios.post(defaultUrl, newObj).then(response => {
        console.log(response);
        createNoteMsg(`Added ${newPerson.name} successfully`,false);
        setPersons(persons.concat(response.data));
      })

    }
  }

  function createNoteMsg(msg, isError) {
    isError?setErrorMsg(true):setErrorMsg(false);
    setNoteMsg(msg);
    setTimeout(()=>{setNoteMsg(null)}, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {noteMsg && <Notification msg={noteMsg} errorMsg={errorMsg} />} 

      <SearchForm handleSearch={handleSearch} />

      <AddForm handleInput={handleInputChange} handleNumber={handleNumberChange} handleAdd={addPerson} />

      <h2>Numbers</h2>

      <PhoneList persons={persons} deletePerson={deletePerson} />

    </div>
  )
}

export default App