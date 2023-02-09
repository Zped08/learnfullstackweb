import React from "react";

const Filter = ({ searchTerm, handleSearch }) => (
  <div>
    filter show with <input value={searchTerm} onChange={handleSearch} />
  </div>
);

export default Filter;
