import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';


const ButtonStyle = styled.button`
  background: #edede9;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid black;
  height: 2.5em;
  width: 12em;
  border-radius: 7px;


`;


export default function CreateReview() {


  return (
    <ButtonStyle>Create A Review</ButtonStyle>
  )
}