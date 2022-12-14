import React from 'react';
import { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import Clear from './Clear.svg';
import Search from './Search.svg';
import  {ProductContext}  from "./Questions.jsx";


const Container = styled.div`
  font-family: 'Arial';
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 5px;
  &:hover {
    box-shadow: 2px 2px 2px thistle;
  }
`;

const TextInput = styled.input`
  flex: 1 0;
  min-width: 25px;
  min-height: 25px;
  font-size: 0.8em;
  font-weight:bold;
  background-color: transparent;
  padding-left: 5px;
  border: 1px;
  &:focus {
    outline: none;
  }
`;

const Icon = styled.div`
  flex: 0.05 0;
  cursor: pointer;
`;

export default function SearchBar({ searchQuestion }) {
  const [keyWord, setKeyword] = useState('');


  const handleChange = (event) => {
    //console.log('handle on change');
    setKeyword(event.target.value);

    if (event.target.value.length > 3) {
      //console.log('Searching with more than 3 characters : ',event.target.value);
      searchQuestion(event.target.value.toLowerCase());
    } else {
      searchQuestion('');
    }
  };

  const handleClear = (event) => {
    //console.log('Clear the search bar');
    setKeyword('');
    searchQuestion('');
  };

  return (
    <Container>
    <Icon>
        <Search
          width="20px"
          height="20px"
          stroke="red"
          // onClick={handleSearch}
        />
      </Icon>
      <TextInput
        value={keyWord}
        onChange={handleChange}
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      />
      <Icon>
        <Clear
          width="20px"
          height="20px"
          stroke="red"
          onClick={handleClear}
        />
      </Icon>

    </Container>
  );
}
