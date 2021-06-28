import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const personsToShow = persons.filter((p) =>
    p.name.toLocaleLowerCase().includes(nameFilter)
  );

  const addName = (event) => {
    event.preventDefault();

    if (persons.find((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.find((e) => e.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={personsToShow}></Persons>
    </div>
  );
};

export default App;
