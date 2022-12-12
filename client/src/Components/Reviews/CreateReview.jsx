import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import ConfirmationModalImpl from '../Shared/ModalWindowImpl.jsx'


const ButtonStyle = styled.button`
background: white;
font-size: 0.8em;
margin: 1em;
padding: 0.25em 1em;
border: 1px solid black;
height: 3em;
font-weight:bold;


`;

const clickHandler = () => {
   <ConfirmationModalImpl />
}


export default function CreateReview() {


  return (
    <ButtonStyle onClick={clickHandler()}>Create A Review</ButtonStyle>

  )
}