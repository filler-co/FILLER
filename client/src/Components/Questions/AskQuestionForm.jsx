import React, { useState } from "react";
import styled from "styled-components";

/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: 100%;
  min-height: 100%;
  color: black;
  grid-template-rows: 0.05fr 0.45fr 0.05fr 0.25fr 0.05fr 0.15fr;
  grid-template-areas:
    "label"
    "question"
    "label"
    "nickname"
    "label"
    "email";
  text-align: left;
  grid-gap: 0.05rem;
  overflow-y:auto;
 `;

 const Line = styled.hr`
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 0.5em;
  margin-right: 0.5em;
`;

 const Input = styled.input.attrs({
  type: 'text'
})`
  color: black;
  margin-bottom: 1em;
  padding: 1.5em;
  font-size : 0.7em;
  ${'' /* text-transform: uppercase; */}
  width: 93%;
  border-radius: 5px;
  border: solid 1px black;
  height: 2.5em;
  box-shadow: 1px;
  outline: none;
  text-align: left;
  &:hover {
    box-shadow: 2px 2px 2px thistle;
  }

`

const Question = styled.textarea`
  color: black;
  ${'' /* text-transform: uppercase; */}
  width: 93%;
  border-radius: 5px;
  font-size : 0.7em;
  border: solid 1px black;
  margin-bottom: 0.5em;
  padding: 1em;
  height: 8em;
  box-shadow: 1px;
  outline: none;
  text-align: left;
  resize: none;
  &:hover {
    box-shadow: 2px 2px 2px thistle;
  }
`;

const SubmitBtn = styled.input.attrs({
  type: 'submit',
  value: 'Submit'
})`
  background: black;
  color: #fff;
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  width: 93%;
  border-radius: 3px;
  height: 35px;
  border-color: transparent;
  outline: none;
  text-align: center;
  &:active {
    background-color: #red;
  }
  `

  const Message = styled.span `
    font-size : 0.7em;
    color: grey;
    margin-top : 0.7em;
  `


export default function AskQuestionForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');

  const handleOnchange = (event) => {
    console.log('handle onchange with : ', event.target.name);
    let name = event.target.name;
    if (name === 'name') {
      setName(event.target.value);
    } else if (name === 'email') {
      setEmail(event.target.value);
    } else {
      setQuestion(event.target.value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (

      <form >
      <Line />
        <label>Your name<span>&#42;</span></label>
        <Input placeholder="Example: bob (Maximum of 25 characters)" name="name" value={name} onChange={handleOnchange}/>
        <label>Your Email<span>&#42;</span></label>
        <Input placeholder="Example: youremail@example.com" name="email" onChange={handleOnchange} value={email}/>
        <label>Your Question<span>&#42;</span> <Message>(Up to 1000 characters)</Message></label>
        <Question placeholder="What do you want to know about this product?" name="question" onChange={handleOnchange} value={question}/>
        <SubmitBtn />
        <Message>Asterisk(*) indicated mandatory field</Message>
      </form>
  )
}