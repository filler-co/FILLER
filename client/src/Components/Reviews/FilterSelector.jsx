import React from 'react';
import styled, { css } from 'styled-components';


const StyledSelector = styled.select`
border: none;
margin-left: 5px;
text-decoration: underline;
`


export default function FilterSelector({sortState, setSortState}) {
const handleChange = (e) => {
  setSortState(e.target.value.slice())
}


  return (

    <StyledSelector name="filter" placeholder="select" onChange={handleChange}>
      <option value="relevant">relevance</option>
      <option value="newest">newest</option>
      <option value="helpful">helpfulness</option>
    </StyledSelector>
  )
}