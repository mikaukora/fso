import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState({});

  const personsToShow = persons.filter((p) =>
    p.name.toLocaleLowerCase().includes(nameFilter)
  );

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  const addName = (event) => {
    event.preventDefault();

    if (persons.find((e) => e.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find((e) => e.name === newName);
        const updated = { ...personToUpdate, number: newNumber };

        personService
          .update(updated.id, updated)
          .then(() => {
            setPersons(persons.map((e) => (e.id === updated.id ? updated : e)));
            setNewName("");
            setNewNumber("");
            showNotification(`${personToUpdate.name} updated`);
          })
          .catch((error) => {
            setNewName("");
            setNewNumber("");
            setPersons(persons.filter((e) => e.id !== personToUpdate.id));
            showNotification(
              `Information of ${personToUpdate.name} has already been removed from server`,
              true
            );
          });
      }
    } else if (persons.find((e) => e.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      const person = { name: newName, number: newNumber };

      personService.create(person).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        showNotification(`${person.name} added`);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handlePersonDelete = (id) => {
    const person = persons.find((e) => e.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      showNotification(`${person.name} deleted`);
      personService
        .deleteId(person.id)
        .then(setPersons(persons.filter((e) => e.id !== person.id)))
        .catch((error) => console.log(error));
    }
  };

  const showNotification = (msg, error = false) => {
    setNotification({ message: msg, error: error });
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={nameFilter} onChange={handleFilterChange}></Filter>
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        handleDelete={handlePersonDelete}
      ></Persons>
    </div>
  );
};

export default App;
