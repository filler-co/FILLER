import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { report } from '../../utils/helper';
import PhotoGallery from './PhotoGallery';

/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: 50%;
  ${'' /* color: white; */}
  grid-template-rows: 0.3fr 0.2fr 0.4fr 0.1fr;
  grid-template-areas:
    "answer"
    "answerinfo"
    "photocontainer"
    "answerinfoimg";
  text-align: left;
  grid-gap: 0.25rem;

 `;

const Answer = styled.div`
  ${'' /* background: #3a3a55; */}
  grid-area: answer;
  padding: 0.15rem;
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

const AnswerInfoImg = styled.div`
  ${'' /* background: #1f2128; */}
  grid-area: answerinfoimg;
  margin-bottom: 3.5em;
  ${'' /* padding: 0.25rem; */}
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

  useEffect(() => {
    // localStorage.setItem(answer.id, false);
    // localStorage.clear();
    setVote(answer.helpfulness);
  },[])


  const [votedFlag, setVotedFlag] = useState(!!localStorage.getItem(answer.id));
  const [reporedFlag, setReportedFlag] = useState(!!localStorage.getItem(answer.id+'report'));
  const [vote, setVote] = useState(0);


  const handleVoteClick = () => {
    console.log('voted localstore is : ', !localStorage.getItem(answer.id));
    if (!localStorage.getItem(answer.id)) {
      console.log('should be able to vote');
      localStorage.setItem(answer.id, true);
      setVotedFlag(true);
      setVote(vote+1);
    handleVote('answers',answer.id);
    }
  }

  // const handleVoteClick = () => {
  //   console.log('votedflag is : ', localStorage.getItem(question.question_id))
  //   if (!localStorage.getItem(question.question_id)) {
  //     localStorage.setItem(question.question_id, true);
  //     setVotedFlag(true);
  //     handleVote('questions',question.question_id);
  //   }

  // }




  const handleReportClick = () => {

    if (!localStorage.getItem(answer.id+'report')) {
      localStorage.setItem(answer.id+'report', true);
      // console.log('reported');
      report('answers',answer.id);
      setReportedFlag(true);
    } else {

    }

  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }



  return (
    <Container>
      <Answer>
        <strong>A:&nbsp;</strong>{answer.body}
      </Answer>
      <AnswerInfo done={votedFlag && reporedFlag}>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;By&nbsp;{answer.answerer_name},&nbsp;&nbsp;{formatDate(answer.date)} | Helpful?<SpanElement done={votedFlag} onClick={handleVoteClick}> Yes({vote})</SpanElement> | <SpanElement done={reporedFlag} onClick={handleReportClick}>{!reporedFlag ? 'Report' : 'Reported'}</SpanElement></div>
      </AnswerInfo>
      <PhotoContainer>
        <PhotoGallery images={answer.photos}/>
      </PhotoContainer>
      {answer.photos.length > 0 &&
        <AnswerInfoImg done={votedFlag && reporedFlag}>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;By&nbsp;{answer.answerer_name},&nbsp;&nbsp;{formatDate(answer.date)} | Helpful?<SpanElement done={votedFlag} onClick={handleVoteClick}> Yes({vote})</SpanElement> | <SpanElement done={reporedFlag} onClick={handleReportClick}>{!reporedFlag ? 'Report' : 'Reported'}</SpanElement></div>
      </AnswerInfoImg>
      }

    </Container>
  );
}
