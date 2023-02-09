import React from 'react'

const ContactList = ({ filteredPersons = []}) => (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );

  export default ContactList