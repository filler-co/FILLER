import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Clear from '../Questions/Clear.svg'
import CharRatings from './CharRatings.jsx'
import OverallStarRating from './OverallStarRating.jsx'




const StyledReviewForm = styled.div`

`

const FormBody = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
margin: 5px;

`
const ClearButton = styled.div`
grid-area: clear-svg;
display: flex;
justify-content: flex-end;
height: 25px;
`
const FormHeader = styled.p`
padding: 10px;
margin: 5px;
border-bottom: solid grey 2px;

`
const InputTitle = styled.p`
margin-top: 5px;
background: none;
font-weight: bold;
font-size: .75rem;
padding: 5px;


`
const SubmitButton =  styled.button`
  background: black;
  color: #fff;
  cursor: pointer;
  margin-top: 1em;
  text-transform: uppercase;
  font-size:0.8em;
  width: 100%;
  border-radius: 3px;
  height: 35px;
  border-color: transparent;
  outline: none;
  text-align: center;
  font-weight:bold;
  &:hover {
    background-color: grey;
  }
  `



const PhotoSubmit = styled.button``

const StyledInput= styled.input`
grid-area: form-input;
margin: 0px 5px;
font-size: .75rem;
`
const CharSection = styled.div`
margin-top: 5px;
padding: 10px;
display: grid;
grid-template-columns: 50% 50%;
grid-template-rows: 20% 26% 26% 26%;
grid-template-areas:
"form-header form-header"
"form-input form-input"
"form-input form-input"
"form-input form-input";
text-align: center;
border: solid black 1px;


`
const RadioHeader = styled.h5`
grid-area: form-header;
`

const ReccomendForm = styled.form`
margin: 0px 5px;
padding: 0px 9px;

`


export default function ReviewForm({setOpen}) {
  const handleFormClose = () => {
    setOpen(false)
  }

  return (
    <>
      <ClearButton>
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
        <OverallStarRating />
        <InputTitle>Nickame*</InputTitle>
          <StyledInput placeholder="Example: jackson11!"></StyledInput>
          <InputTitle>E-mail*</InputTitle>
          <StyledInput placeholder="Example: jackson11@email.com"></StyledInput>
          <InputTitle>Do you reccomend this product?</InputTitle>
          <ReccomendForm action="submit">
            <label style={{"fontSize" : ".75rem", "fontWeight": "bold"}}>Yes
            <StyledInput type="radio" name="recIn"></StyledInput>
            </label>
            <label style={{"fontSize" : ".75rem", "fontWeight": "bold"}}> / No
            <StyledInput type="radio" name="recIn"></StyledInput>
            </label>
          </ReccomendForm>
          <CharSection>
            <RadioHeader style={{"textAlign" : "center", "fontSize": "1.025em"}}>Product Characteristics</RadioHeader>
          <CharRatings />
          </CharSection>
          <InputTitle>Review Summary*</InputTitle>
          <StyledInput placeholder="Example: Best purchase ever!"></StyledInput>
          <InputTitle>Review Body*</InputTitle>
          <StyledInput style={{"minHeight": "30px"}} placeholder="Why did you like the product or not?"></StyledInput>
          <SubmitButton onClick={handleFormClose}>Sumbit Your Review</SubmitButton>


      </FormBody>
    </StyledReviewForm>
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