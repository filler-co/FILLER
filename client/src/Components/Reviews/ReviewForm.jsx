import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
//import Clears from '../Questions/clear.svg'



const StyledReviewForm = styled.div`

`

const FormBody = styled.div`

`
const ClearButton = styled.div`
grid-area: clear-svg;
display: flex;
justify-content: flex-end;
height: 25px;
`
const FormHeader = styled.p`


`


export default function ReviewForm({setOpen}) {
  const handleFormClose = () => {
    setOpen(false)
  }

  return (
    <>
      {/* <ClearButton>
        <Clear
         width="20px"
         height="20px"
         onClick={handleFormClose}/>
      </ClearButton>
      <FormHeader>
        Add a Review
      </FormHeader>
    <StyledReviewForm>
      <FormBody>
        <label>name
          <input></input>
        </label>
        <label>email
          <input></input>
        </label>
      </FormBody>
    </StyledReviewForm> */}
    </>
  )
}


// display: grid;
//   grid-template-rows: .1fr .1fr .2fr .1fr .1fr .1fr .1fr .1fr .1fr;
//   grid-template-areas:
//   "header"
//   "overall-rating"
//   "recommend"
//   "charecteristics"
//   "summary"
//   "body"
//   "photo-upload"
//   "nickname"
//   "email"
//   "submit-button"