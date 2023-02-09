import React from 'react'

const ContactForm = ({
    addName,
    newName,
    newNumber,
    handleName,
    handleNumber,
  }) => (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );

  export default ContactForm