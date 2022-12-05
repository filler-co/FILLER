import React from 'react';
import styled, { css } from 'styled-components';
import AnswerItem from './AnswerItem.jsx';

/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: 100%;
  color: white;
  grid-template-columns: 0.7fr 0.2fr 0.1fr;
  grid-template-rows: 0.3fr 0.6fr 0.1fr;
  grid-template-areas:
    "question helpful addanswer"
    "list list list"
    "loadmore loadmore loadmore";
  text-align: left;
  grid-gap: 0.25rem;
 `;

const Question = styled.div`
  background: #3a3a55;
  grid-area: question;
  padding: 0.25rem;
  font-weight: bold;
`;

const Helpful = styled.div`
  background: #1f2128;
  grid-area: helpful;
  padding: 0.25rem;
  font-size: 0.65em;
`;

const AddAnswer = styled.div`
  background: #1f2128;
  grid-area: addanswer;
  padding: 0.25rem;
  font-size: 0.65em;
`;

const LoadMore = styled.div`
  background: #3a3a55;
  grid-area: loadmore;
  padding: 0.25rem;
  font-weight: bold;
  font-size: 0.75em;
`;

const AnswerList = styled.div`
  background: #1f2128;
  grid-area: list;
  padding: 0.25rem;
`;

export default function Questions({ question }) {

  return (
    <Container>
      <Question>
        Q:{question.question_body}
      </Question>
      <Helpful>
        Helpful? Yes({question.question_helpfulness})
      </Helpful>
      <AddAnswer>
      <a>Add Answer</a>
      </AddAnswer>
      <AnswerList>
      {Object.values(question.answers).map((answer, index) => {
        {/* return <div key={index}>A:{answer.body}</div> */}
        return <AnswerItem answer={answer}/>
      })}
      </AnswerList>
      {Object.values(question.answers).length > 0 ?  <LoadMore>
        <a>LOAD MORE ANSWERS</a>
      </LoadMore> : ''}

      {/* <div>By {question.asker_name},{question.question_date} | | Report:{question.reported}</div> */}
    </Container>


  );
}
