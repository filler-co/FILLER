import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';


const ButtonStyle = styled.button`
background: white;
font-size: 0.8em;
margin: 1em;
padding: 0.25em 1em;
border: 1px solid black;
height: 3em;
font-weight:bold;


`;


export default function CreateReview() {


  return (
    <ButtonStyle>Create A Review</ButtonStyle>
  )
}