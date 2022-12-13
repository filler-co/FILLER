import { React, useState } from 'react';
import styled from 'styled-components';


const ButtonStyle = styled.button`
  background: white;
  font-size: 0.8em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid black;
  height: 3em;
  font-weight:bold;
  cursor:pointer;
  &:hover {
    background-color: grey;
  }
`;




const RenderRelatedEntry = ({ changeRenderedProduct, relatedId, setRevNum, setqNum }) => {

  // add setQNum
  return (
    <>
      <ButtonStyle>
        <div onClick={(e) => { changeRenderedProduct(relatedId); setRevNum(2); setqNum(2) }}>
          <div>{relatedId}</div>
        </div>
      </ButtonStyle>
    </>


  );
};

export default RenderRelatedEntry;