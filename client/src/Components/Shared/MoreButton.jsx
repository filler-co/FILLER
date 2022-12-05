import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyle = styled.button`
  ${'' /* background: #9EBD6E; */}
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid black;
  height: 3em;
`;

export default function MoreButton({ buttonName, actionNeed }) {
  const handleClick = (event) => {
    console.log('Handle click with button : ', buttonName);
    actionNeed();
  };

  return (
    <ButtonStyle>
      <div onClick={handleClick}>{buttonName}</div>
    </ButtonStyle>
  );
}
