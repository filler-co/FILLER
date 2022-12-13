import React, { useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import ModalWindow from '../Shared/ModalWindow';
import * as Pos from '../Shared/ModalWindow';

/* Define style for component*/
const Container = styled.div`
  display: grid;
  ${'' /* max-height: 25vh;
  min-height:auto; */}
  color: black;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
    "p1 p2 p3 p4 p5";
  align-items: start;
  grid-gap: 0.05rem;
 `;

const P1 = styled.span`
  ${'' /* background: #3a3a55; */}
  grid-area: p1;
  padding: 0.25rem;
  cursor:pointer;

`;

const P2 = styled.span`
  ${'' /* background: #3a3a55; */}
  grid-area: p2;
  padding: 0.25rem;
  cursor:pointer;
`;

const P3 = styled.span`
  ${'' /* background: #3a3a55; */}
  grid-area: p3;
  padding: 0.25rem;
  cursor:pointer;
`;

const P4 = styled.span`
  ${'' /* background: #3a3a55; */}
  grid-area: p4;
  padding: 0.25rem;
  cursor:pointer;
`;

const P5 = styled.span`
  ${'' /* background: #3a3a55; */}
  grid-area: p5;
  padding: 0.25rem;
  cursor:pointer;
`;

// grid-template-columns: repeat(auto-fill, 40px);

export default function PhotoGallery({ images }) {

  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const [url, setUrl] = useState('');

  const hideModal = (arg) => {
    setShow(false);
  };

  const handleImgClick = (url) => {
    //console.log('handle the 1st photo modal');
    setUrl(url);
    showModal();

  }

  // {images[0] && <P1 onClick={() => { handleImgClick(images[0]) }}><img src='http://localhost:3000/dd92769dce988d7debb434de7192b7ed' alt="img" width="100" height="80" /></P1>}

  return (
    <Container>
      {images[0] && <P1 onClick={() => { handleImgClick(images[0]) }}><img src={images[0]} alt="img" width="100" height="80" /></P1>}
      {images[1] && <P2 onClick={() => { handleImgClick(images[1]) }}><img src={images[1]} alt="img" width="100" height="80" /></P2>}
      {images[2] && <P3 onClick={() => { handleImgClick(images[2]) }}><img src={images[2]} alt="img" width="100" height="80" /></P3>}
      {images[3] && <P4 onClick={() => { handleImgClick(images[3]) }}><img src={images[3]} alt="img" width="100" height="80" /></P4>}
      {images[4] && <P5 onClick={() => { handleImgClick(images[4]) }}><img src={images[4]} alt="img" width="100" height="80" /></P5>}
      <ModalWindow
        show={show}
        url={url}
        handleClose={hideModal}
        usage='image'
        openPos={Pos.CM_CENTER_CENTER}>
      </ModalWindow>
    </Container>
  );
}

