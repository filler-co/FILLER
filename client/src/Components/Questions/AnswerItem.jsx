import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { report } from '../../utils/helper';
import PhotoGallery from './PhotoGallery';

/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: 50%;
  color: black;
  grid-template-rows: 0.4fr 0.2fr 0.4fr;
  grid-template-areas:
    "answer"
    "answerinfo"
    "photocontainer";
  text-align: left;
  grid-gap: 0.25rem;

 `;

const Answer = styled.div`
  ${'' /* background: #3a3a55; */}
  grid-area: answer;
  padding: 0.25rem;
  font-size: 0.85em;

`;

const AnswerInfo = styled.div`
  ${'' /* background: #1f2128; */}
  grid-area: answerinfo;
  padding: 0.25rem;
  font-size: 0.65em;
  color:grey;
  ${'' /* cursor: pointer; */}
  cursor: ${({done}) => (done ? '' : 'pointer')}
`;

const PhotoContainer = styled.div`
  ${'' /* background: #1f2128; */}
  grid-area: photocontainer;
  padding: 0.25rem;
`;

const SpanElement = styled.span`
  text-decoration: ${({done}) => (!done ? 'underline' : 'none')}

`

export default function AnswerItem({ answer, handleVote }) {

  // useEffect(() => {
  //   localStorage.setItem("voted", false);
  // },[])


  const [votedFlag, setVotedFlag] = useState(!!localStorage.getItem(answer.id));
  const [reporedFlag, setReportedFlag] = useState(!!localStorage.getItem(answer.id+'report'));

  const handleVoteClick = () => {
    console.log('voted localstore is : ', localStorage.getItem(answer.id));
    if (!localStorage.getItem(answer.id)) {
      localStorage.setItem(answer.id, true);
      setVotedFlag(true);
    handleVote('answers',answer.id);
    }
  }

  const handleReportClick = () => {

    if (!localStorage.getItem(answer.id+'report')) {
      localStorage.setItem(answer.id+'report', true);
      // console.log('reported');
      report('answers',answer.id);
      setReportedFlag(true);
    } else {

    }


  }



  return (
    <Container>
      <Answer>
        A:{answer.body}
      </Answer>
      <AnswerInfo done={votedFlag && reporedFlag}>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;By {answer.answerer_name},{answer.date} | Helpful?<SpanElement done={votedFlag} onClick={handleVoteClick}> Yes({answer.helpfulness})</SpanElement> | <SpanElement done={reporedFlag} onClick={handleReportClick}>{!reporedFlag ? 'Report' : 'Reported'}</SpanElement></div>
      </AnswerInfo>
      <PhotoContainer>
        <PhotoGallery images={answer.photos}/>
      </PhotoContainer>
    </Container>
  );
}
