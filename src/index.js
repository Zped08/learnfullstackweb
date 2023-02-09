import React, { useState } from "react";
import ReactDOM from "react-dom";
import Filter from "./components/Filter";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 213213131 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addName = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    event.preventDefault();
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <h2>Add new contact</h2>
      <Contact
        addName={addName}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <ContactList filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
