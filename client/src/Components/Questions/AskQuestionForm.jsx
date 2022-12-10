import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "./Questions";
import validateForm from "../Shared/validateForm";


/* Define style for component*/
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

  const Message = styled.div `
    font-size : 0.6em;
    color: ${({type}) => (type)};
    margin-top : 0.7em;
  `

  const ErrorMsg = styled.div `
    font-size : 0.6em;
    color: 'red';

  `

export default function AskQuestionForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState(null);

  const [product, postQuestion, closeWindow] = useContext(ProductContext);
  // console.log('product id is : ', product);

  const handleOnchange = (event) => {
    //console.log('handle onchange with : ', event.target.name);
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
    const resultError = validateForm({name, email, question});

    if (resultError !== null) {
			setError(resultError);
			return;
		}

    setName('');
		setEmail('');
		setQuestion('');
    setError(null);

    postQuestion(name, email, question);

    closeWindow()
  }

  return (

      <form onSubmit={handleSubmit}>
      <Line />
        <div>Your name<span>&#42;</span></div>
        <Input placeholder="Example: bob (Maximum of 25 characters)" name="name" value={name} onChange={handleOnchange}/>
        <div>Your Email<span>&#42;</span></div>
        <Input placeholder="Example: youremail@example.com" name="email" onChange={handleOnchange} value={email}/>
        <div>Your Question<span>&#42;</span> <Message type='grey'>(Up to 1000 characters)</Message></div>
        <Question placeholder="What do you want to know about this product?" name="question" onChange={handleOnchange} value={question}/>
        <SubmitBtn />
        <Message type='grey' >Asterisk(*) indicated mandatory field</Message>
        {error && <Message type="red" >{error}</Message>}
      </form>
  )
}