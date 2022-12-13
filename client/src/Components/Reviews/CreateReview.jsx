import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
//import Clear from '../Questions/clear.svg'


const ButtonStyle = styled.button`
background: white;
font-size: 0.8em;
margin: 1em;
padding: 0.25em 1em;
border: 1px solid black;
height: 3em;
font-weight:bold;


`;

const DialogStyles = styled.dialog`
  width: 500px;
  maxWidth: 100%;
  margin: 0 auto;
  position: fixed;
  left: 50%;
  top: 50%;
  height: 500px;
  transform: translate(-50%,-50%);
  zIndex: 999;
  backgroundColor: #eee;
  padding: 10px 20px 40px;
  borderRadius: 8px;
  display: grid;
  grid-template-rows: .1fr .1fr .2fr .1fr .1fr .1fr .1fr .1fr .1fr;
  grid-template-areas:
  "header"
  "overall-rating"
  "recommend"
  "charecteristics"
  "summary"
  "body"
  "photo-upload"
  "nickname"
  "email"
  "submit-button"

`


const FormHeader = styled.button`
background: white;
font-size: 0.8em;
margin: 1em;
padding: 0.25em 1em;
border: none;
height: 3em;
font-weight:bold;
display: flex;
justify-content: flex-end;

`
// const FormHeader = styled.input`

// `
// const FormHeader = styled.input`

// `
// const FormHeader = styled.input`

// `



const DialogCloseButtonStyles = styled.button`

background: white;
font-size: 0.8em;
margin: 1em;
padding: 0.25em 1em;
border: 1px solid black;
height: 3em;
font-weight:bold;
cursor:pointer;
&:hover {
  background-color: grey;
}

`



export default function CreateReview() {
  const [open, setOpen] = useState(false)
  // const setOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }


  const hideModal = (arg) => {
    setShow(false);
  };


  return (
    <>
    <DialogCloseButtonStyles onClick={() => {setOpen(true)} }>CREATE A REVIEW </DialogCloseButtonStyles>
    {/* { open ? <DialogStyles open>
      <FormHeader>

      </FormHeader>

    </DialogStyles> : <div></div>} */}
    </>

  )
}