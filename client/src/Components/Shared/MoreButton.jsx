import {React, useState} from 'react';
import styled, { css } from 'styled-components';

const ButtonStyle = styled.button`
  background: white;
  font-size: 0.8em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid black;
  height: 3em;
  font-weight:bold;
`;
/*This is passed as my actionNeed from the component that is using the button

const getProductReview = () => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&count=${num}&sort=newest`, { headers: { Authorization: token.TOKEN } })
  .then((data) => { setReviewList(data.data.results); })
  .catch((err) => console.log(err));
};*/

/*
Using the MoreButton
1. establish a global Question number(qNum) in index.js
2. pass this state to your component AND Related products
3. in Related products reset qNum's state when a new product is clicked
4. pass down a qNum state to the button(similar to revNum)
5. set either qNum or revNum to false (in Reviews.js or Questions.js) depedning on where the button is located
6. add setqNum operation to the right side of ternary operator on line 37
*/



export default function MoreButton({ buttonName, actionNeed, setRevNum, revNum, setqNum, qNum}) {
  const handleClick = (event) => {
    console.log('Handle click with button : ', buttonName);
    event.preventDefault();
    revNum ? setRevNum(revNum + 2) :
    qNum && setqNum(qNum+2)
    actionNeed()
  };

  return (
    <ButtonStyle>
      <div onClick={handleClick}>{buttonName}</div>
    </ButtonStyle>
  );
}
