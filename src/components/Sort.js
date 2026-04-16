import React from "react";

function Sort({ onSort }) {
  return (
    <select className="form-select mb-3" onChange={(e) => onSort(e.target.value)}>
      <option>Sort By</option>
      <option value="low">Price Low → High</option>
      <option value="high">Price High → Low</option>
    </select>
  );
}

export default Sort;