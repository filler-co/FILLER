import {React, useState} from 'react';
import styled, { css } from 'styled-components';

const ButtonStyle = styled.button`
  ${'' /* background: #9EBD6E; */}
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid black;
  height: 3em;

`;
/*This is passed as my actionNeed fromor the component that is using the button

const getProductReview = () => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&count=${num}&sort=newest`, { headers: { Authorization: token.TOKEN } })
  .then((data) => { setReviewList(data.data.results); })
  .catch((err) => console.log(err));
};*/



export default function MoreButton({ buttonName, actionNeed, num, setNum }) {
  const handleClick = (event) => {
    console.log('Handle click with button : ', buttonName);
    event.preventDefault();
    setNum(num + 2);
    actionNeed()
  };

  return (
    <ButtonStyle>
      <div onClick={handleClick}>{buttonName}</div>
    </ButtonStyle>
  );
}
