import React from 'react';
import { useState, useEffect} from 'react';
import QuestionItem from './QuestionItem.jsx';


export default function Questions({ questions }) {
  const mock = ['Is it waterproof?','Does it run small?','Why is this product cheaper here than other sites?'];
  // useEffect(() => {
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp//qa/questions?${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
  // },[renderedProduct.id])

  return (
    <div className="container">
      Q&A
      {mock.map((question, index) => <QuestionItem question={question} key={index}/>)}
    </div>
  );
}
