import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionItem from './QuestionItem.jsx';
import SearchBar from './SearchBar.jsx';
import MoreButton from '../Shared/MoreButton.jsx';
import token from '../../../../config.js';
import styled, { css } from 'styled-components';

/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: 100%;
  color: white;
  grid-template-columns: 0.4fr 0.6fr;
  grid-template-rows: 0.1fr 0.1fr 0.75fr 0.05fr;

  grid-template-areas:
    "header header"
    "search search"
    "list list"
    "moreQBtn askBtn";
  text-align: left;
  grid-gap: 1rem;
 `;

 const Header = styled.div`
  color:grey;
  grid-area: header;
  ${'' /* padding: 0.25rem; */}
`;

const Search = styled.div`
  ${'' /* background: #01BAEF; */}
  grid-area: search;
  padding: 0.25rem;
`;
const QAList = styled.div`
  background: #0CBABA;
  grid-area: list;
  padding: 0.25rem;
`;
const MoreQuestionBtn = styled.div`
  ${'' /* background: #FFD3BA; */}
  grid-area: moreQBtn;
  padding: 0.25rem;
`;

const AskQuestionBtn = styled.div`
  ${'' /* background: #FFD3BA; */}
  grid-area: askBtn;
  padding: 0.25rem;
`;

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
    <Container>
    <Header>
    QUESTIONS & ANSWERS
    </Header>

      <Search>
        <SearchBar />
      </Search>
      <QAList>
        {questions.length > 0 ? questions.map((question, index) => <QuestionItem question={question} key={index} />) : 'Still loading'}
      </QAList>
      <MoreQuestionBtn>
        <MoreButton buttonName='MORE ANSWERED QUESTIONS' />
      </MoreQuestionBtn>
      <AskQuestionBtn>
        <MoreButton buttonName='ADD A QUESTION +' />
      </AskQuestionBtn>
    </Container>
  );
}
