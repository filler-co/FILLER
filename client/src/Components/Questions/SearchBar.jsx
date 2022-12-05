import React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';

const SearchStyle = styled.input`
  width: 98%;
  padding: 10px;
  margin: 10px;
  border: 1.5px solid grey;
  ${'' /* border-radius: 2px; */}
  box-sizing: border-box;
`;

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
      <form onSubmit={handleSubmit}>
          <SearchStyle type='text' onChange={handleChange} value={keyWord} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
}
