import React, { useEffect, createContext, useContext } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import AnswerItem from './AnswerItem.jsx';
import {sortResults, imcrementVote} from '../../utils/helper.js';
import ModalWindow from '../Shared/ModalWindow.jsx';
import * as Pos from '../Shared/ModalWindow.jsx';
import axios from 'axios';
import Highlighter from './HighLighter.jsx';
import { ProductContext } from './Questions.jsx';


/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: 100vh;
  min-height:auto;
  ${'' /* color: black; */}
  grid-template-rows: 0.1fr 0.89fr 0.01fr;
  grid-template-columns: 0.7fr 0.2fr 0.1fr;
  grid-template-areas:
    "question helpful addanswer"
    "list list list"
    "loadmore loadmore loadmore";
  text-align: left;
  grid-gap: 0.05rem;
 `;

const Question = styled.div`
  ${'' /* background: #3a3a55; */}
  grid-area: question;
  padding: 0.25rem;
  font-weight: bold;
`;

const Helpful = styled.div`
  ${'' /* background: #1f2128; */}
  grid-area: helpful;
  padding: 0.25rem;
  font-size: 0.65em;
  text-decoration: ${({done}) => (!done ? 'underline' : 'none')};
  cursor: ${({done}) => (done ? '' : 'pointer')}
`;

const AddAnswer = styled.div`
  ${'' /* background: #1f2128; */}
  grid-area: addanswer;
  padding: 0.25rem;
  font-size: 0.65em;
  text-decoration: underline;
  cursor: pointer;
`;

const LoadMore = styled.div`
  ${'' /* background: #3a3a55; */}
  grid-area: loadmore;
  padding: 0.25rem;
  font-weight: bold;
  font-size: 0.65em;
  cursor:pointer;
`;

const AnswerList = styled.div`
  ${'' /* background: #1f2128; */}
  grid-area: list;
  padding: 0.25rem;
  min-height: auto;
  max-height: 65vh;
  overflow-y: auto;
`;

export let QuestionContext = createContext(null);
export function QuestionsItem({ question, handleVote }) {
  // console.log('question id : ', question.question_id, localStorage.getItem(question.question_id))

  useEffect(() => {
    // localStorage.clear();
    setVote(question.question_helpfulness);
    sortResults(Object.values(question.answers),'helpfulness', (result) => {
      setAnswers(result);
      if (result.length > 2) {
        setDisplayedAnswers(result.slice(0,2));
        setShowLoadmore(true);
      } else {
        setDisplayedAnswers(result);
        setShowLoadmore(false);
      }
    });

  },[question])

  const [answers, setAnswers] = useState([]);
  const [displayedAnswers, setDisplayedAnswers] = useState([]);
  const [showLoadmore, setShowLoadmore] = useState(false);
  const [vote, setVote] = useState(0);

  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('');

  const [votedFlag, setVotedFlag] = useState(!!localStorage.getItem(question.question_id));

  const [product, postQuestion, hide, searchTerm] = useContext(ProductContext);


  const showModal = () => {
    setShow(true);
  };

  const hideModal = (arg) => {
    setShow(false);
  };

  const handleAddQuestionClick = (event) => {
    //console.log('handle ask question modal window popup');
    setUrl('');
    showModal();
  }

  const handleLoadMore = () => {
    //console.log('load more answers');
    let totalNumber = answers.length;
    //console.log('totalnumber is : ', totalNumber, displayedAnswers.length, showLoadmore);

    if (totalNumber > displayedAnswers.length) {
      if (totalNumber > displayedAnswers.length + 2) {
        setDisplayedAnswers(answers.slice(0,displayedAnswers.length+2));
      } else {
        setDisplayedAnswers(answers);
        setShowLoadmore(false);
      }
    } else {
      setShowLoadmore(false);
    }
  }

  const handleVoteClick = () => {
    console.log('votedflag is : ', localStorage.getItem(question.question_id))
    if (!localStorage.getItem(question.question_id)) {
      localStorage.setItem(question.question_id, true);
      setVotedFlag(true);
      setVote(question.question_helpfulness+1);
      handleVote('questions',question.question_id);
    }

  }

  const handleAddAnswerClick = () => {
    showModal();
  }

  const postAnswer = (formData) => {
    console.log('add a answer for question : ', question.question_id);
    let url = `/questions/${question.question_id}/answers`;

    axios.post(url, formData)
    .then((response) => {
      console.log('Client side response for ask a question is : ', response);
    })
    .catch((error) => {
      console.log('Client side error for ask a question is : ', error);
    });
  }
  // console.log('test the array: ', [question, postAnswer]);

  return (
    <QuestionContext.Provider value={[question, postAnswer, hideModal]}>
      <Container>
      <Question>
        {/* Q:&nbsp;{question.question_body} */}
        Q:&nbsp;<Highlighter text={question.question_body} highlight={searchTerm}></Highlighter>
      </Question>
      <Helpful onClick={handleVoteClick} done={votedFlag}>
        Helpful? Yes({vote})
      </Helpful>
      <AddAnswer onClick={handleAddAnswerClick}>
        Add Answer
      </AddAnswer>
      <AnswerList>
      {Object.values(displayedAnswers).map((answer, index) => {
        {/* return <div key={index}>A:{answer.body}</div> */}
        return <AnswerItem answer={answer} key={index} handleVote={handleVote}/>
      })}
      </AnswerList>
      {showLoadmore && <LoadMore><div onClick={handleLoadMore}>&nbsp;&nbsp;&nbsp;&nbsp;LOAD MORE ANSWERS</div></LoadMore>}
      {/* <div>By {question.asker_name},{question.question_date} | | Report:{question.reported}</div> */}
      <ModalWindow
        show={show}
        handleClose={hideModal}
        usage='answer'
        openPos={Pos.CM_CENTER_CENTER}>
      </ModalWindow>
    </Container>
    </QuestionContext.Provider>

  );
}
