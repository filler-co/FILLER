import React from 'react';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { QuestionsItem } from './QuestionsItem.jsx';
import SearchBar from './SearchBar.jsx';
import MoreButton from '../Shared/MoreButton.jsx';
import token from '../../../../config.js';
import styled, { css } from 'styled-components';
import { result } from 'lodash';
import { sortResults, imcrementVote } from '../../utils/helper.js';
import ModalWindow from '../Shared/ModalWindow';
import * as Pos from '../Shared/ModalWindow';


/* Define style for component*/
const Container = styled.div`
  display: grid;
  max-height: 100%;
  min-height: 100%;
  ${'' /* min-height: auto; */}
  color: black;
  grid-template-columns: 0.4fr 0.6fr;
  grid-template-rows: 0.01fr 0.01fr 0.97fr 0.01fr;

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
  ${'' /* padding: 0.25rem; */}
`;
const QAList = styled.div`
  ${'' /* background: #0CBABA; */}
  grid-area: list;
  ${'' /* padding: 0.25rem; */}
  ${'' /* max-height: 100vh;
  min-height: auto; */}
  min-height: auto;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;

`;
const MoreQuestionBtn = styled.div`
  ${'' /* background: #FFD3BA; */}
  grid-area: moreQBtn;
  ${'' /* padding: 0.25rem; */}
`;

const AskQuestionBtn = styled.div`
  ${'' /* background: #FFD3BA; */}
  grid-area: askBtn;
  ${'' /* padding: 0.25rem; */}
`;
export let ProductContext = createContext(null);

export function Questions({ renderedProduct, setqNum, qNum }) {

  const [questions, setQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(true);

  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('');

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

  useEffect(() => {
    getQuestions();
  }, [renderedProduct.id]);

  /* Get all questions back */
  const getQuestions = (numberQuestions) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${renderedProduct.id}&count=${qNum}`, { headers: { Authorization: token.TOKEN } })
      .then((response) => {
        //console.log('Client side response is : ', response.data);
        setQuestions(response.data.results);
        let displayed = response.data.results.length > 2 ? response.data.results.slice(0, 2) : response.data.results
        setDisplayedQuestions(response.data.results);
        // if (response.data.results.length === questions.length) {
        //   console.log('that is all the questions, no more load more button')
        //   setShowMoreBtn(false);
        // }
        //setDisplayedQuestions(result.slice(0, 2));
      })
      .catch((error) => {
        //console.log('Client side error is : ', error);
      });
  }


  /* get questions with manual sorting */
  // const getQuestions = () => {
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
  //     .then((response) => {
  //       console.log('Client side response is : ', response.data);
  //       sortResults(response.data.results, 'question_helpfulness',(result) => {
  //         setQuestions(result);
  //         setDisplayedQuestions(result.slice(0, 2));
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('Client side error is : ', error);
  //     });
  // }


  /* Filter for questions */
  const searchQuestion = (keyWord) => {
    //console.log('Search questions with keyword : ', keyWord);
    let results = [];
    let flag = false;
    questions.forEach((question, index) => {
      if (question.question_body.toLowerCase().includes(keyWord)) {
        //console.log('find a match in question');
        results.push(question);
      } else {
        Object.values(question.answers).forEach((answer) => {
          if (!flag) {
            if (answer.body.toLowerCase().includes(keyWord)) {
              //console.log('find a match in answer')
              results.push(question);
              flag = true;
            }
          }
        })
      }
    })
    //console.log('search result is : ', results);
    setDisplayedQuestions(results);
  }

  /* Handle helpful vote */
  const handleVote = (voteName, id) => {
    imcrementVote(voteName, id, () => {
      // getQuestions(qNum);
    });
  }

  const postQuestion = (username, email, question) => {
    //console.log('Ask a question for : ', );
      let url = `/questions`;
      axios.post(url, {name:username, email:email, question:question, product_id:renderedProduct.id})
      .then((response) => {
        //console.log('Client side response for ask a question is : ', response);
      })
      .catch((error) => {
        //console.log('Client side error for ask a question is : ', error);
      });
  }

  return (
    <ProductContext.Provider value={[renderedProduct, postQuestion, hideModal]}>
    <Container>
      <Header>
        QUESTIONS & ANSWERS
      </Header>
      <Search>
      <SearchBar searchQuestion={searchQuestion} />
      </Search>
      <QAList>
        {/* {displayedQuestions.length > 0 ? displayedQuestions.map((question, index) => <QuestionItem question={question} handleVote={handleVote} key={index} />) : 'Still loading'} */}
        {displayedQuestions.length > 0 ? displayedQuestions.map((question, index) => <QuestionsItem question={question} handleVote={handleVote} key={index} />) : 'No questions for this product, try another product'}
      </QAList>

      {showMoreBtn && <MoreQuestionBtn>
        <MoreButton buttonName='MORE ANSWERED QUESTIONS' actionNeed={getQuestions} setqNum={setqNum} qNum={qNum} />
      </MoreQuestionBtn>}

      <AskQuestionBtn>
        <MoreButton buttonName='ADD A QUESTION +' actionNeed={handleAddQuestionClick} />
      </AskQuestionBtn>

      <ModalWindow
        show={show}
        handleClose={hideModal}
        usage='question'
        openPos={Pos.CM_CENTER_CENTER}>
      </ModalWindow>

    </Container>
     </ProductContext.Provider>
  );
};

