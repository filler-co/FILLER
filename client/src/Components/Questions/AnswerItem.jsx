import React from 'react';
import styled, { css } from 'styled-components';

/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: 100vh;
  color: white;
  grid-template-rows: 0.4fr 0.2fr 0.4fr;
  grid-template-areas:
    "answer"
    "answerinfo"
    "photocontainer";
  text-align: left;
  grid-gap: 0.25rem;
 `;

const Answer = styled.div`
  background: #3a3a55;
  grid-area: answer;
  padding: 0.25rem;
  font-size: 0.85em;

`;

const AnswerInfo = styled.div`
  background: #1f2128;
  grid-area: answerinfo;
  padding: 0.25rem;
  font-size: 0.65em;
`;

const PhotoContainer = styled.div`
  background: #1f2128;
  grid-area: photocontainer;
  padding: 0.25rem;
`;

export default function AnswerItem({ answer }) {

  return (
    <Container>
      <Answer>
        A:{answer.body}
      </Answer>
      <AnswerInfo>
        <div>By {answer.answerer_name},{answer.date} | Helpful? Yes({answer.helpfulness}) | Report: no</div>
      </AnswerInfo>
      <PhotoContainer>
      </PhotoContainer>
    </Container>
  );
}
