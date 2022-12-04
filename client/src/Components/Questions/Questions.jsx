import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionItem from './QuestionItem.jsx';
import SearchBar from './SearchBar.jsx';
import MoreButton from '../Shared/MoreButton.jsx';
import token from '../../../../config.js';

export default function Questions({ renderedProduct }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    // axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp//qa/questions?${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=40347`, { headers: { Authorization: token.TOKEN } })
      .then((response) => {
        console.log('Client side response is : ', response.data);
        setQuestions(response.data.results);
      })
      .catch((error) => {
        console.log('Client side error is : ', error);
      });
  // }, [renderedProduct.id]);
  }, []);

  return (
    <div className="container">
      Q&A
      <SearchBar />
      {questions.length > 0 ? questions.map((question, index) => <QuestionItem question={question} key={index} />) : 'Still loading'}
      <MoreButton />
    </div>
  );
}
