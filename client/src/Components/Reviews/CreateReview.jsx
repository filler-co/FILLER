import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
//import Clear from '../Questions/clear.svg'
import ReviewForm from './ReviewForm.jsx'



const DialogStyles = styled.dialog`
  width: 600px;
  maxWidth: 100%;
  margin: 0 auto;
  position: fixed;
  left: 50%;
  top: 50%;
  height: 750px;
  max-height: 100%;
  transform: translate(-50%,-50%);
  z-index: 999;
  backgroundColor: #eee;
  padding: 10px 20px 40px;
  borderRadius: 8px;


`




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
  const [open, setOpen] = useState(false);



  return (
    <>
    <DialogCloseButtonStyles onClick={() => {setOpen(true)} }>CREATE A REVIEW </DialogCloseButtonStyles>
    { open ? <DialogStyles open>
      <ReviewForm setOpen={setOpen} />

    </DialogStyles> : <div></div>}
    </>

  )
}