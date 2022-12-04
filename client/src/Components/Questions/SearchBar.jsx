import React from 'react';
import { useState } from 'react';

export default function SearchBar({ searchQuestion }) {
  const [keyWord, setKeyword] = useState('');

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log('Handle form submit');
    searchQuestion();
  };

  return (
    <div className="container">
      Search bar
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={keyWord} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
