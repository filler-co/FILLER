import React from 'react';


export default function FilterSelector({sortState, setSortState}) {
  console.log('ss',sortState)
const handleChange = (e) => {
  setSortState(e.target.value.slice())
}


  return (
    <select name="filter" placeholder="select" onChange={handleChange}>
      <option value="relevant">relevance</option>
      <option value="newest">newest</option>
      <option value="helpful">helpfulness</option>
    </select>
  )
}