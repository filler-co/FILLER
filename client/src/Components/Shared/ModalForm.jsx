/*
  A share template form for
     1. Add question
     2. Add answer
     3. Add review
*/

import React from 'react';
import styled, { css } from 'styled-components';
import AskQuestionForm from '../Questions/AskQuestionForm';

/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: auto;
  min-height: auto;
  color: black;
  grid-template-rows: 0.2fr 0.8fr;
  grid-template-columns: 0.5fr 0.5fr;
  grid-template-areas:
    "image header"
    "image form";
  text-align: left;
  grid-gap: 0.25rem;
  overflow-y: auto;

 `;

const Header = styled.div`
  grid-area: header;
  padding: 0.25rem;
  font-size: 1em;
  ${'' /* border : solid 1px red; */}
  font-weight : bold;

`;

const Form = styled.div`
  ${'' /* background: #3a3a55; */}
  grid-area: form;
  padding: 0.25rem;
  font-size: 1em;
  ${'' /* border : solid 1px red; */}
`;

const Image = styled.div`
  grid-area: image;
  padding: 0.25rem;
  ${'' /* border : solid 1px red; */}
`;

export default function ModalForm({ productName, }) {

  return (
    <Container>
      <Image>
      <img style={{border:"none"}} src='./img1.jpg' alt="img" width="300" height='400' />
      </Image>
      <Header>
        <label>Ask a Question for</label><br/>
        <label>a product </label>
      </Header>
      <Form>
        <AskQuestionForm />
      </Form>
    </Container>
  )

}