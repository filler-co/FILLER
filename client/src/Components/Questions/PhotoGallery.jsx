import React, { useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import ModalWindow from '../Shared/ModalWindow';
import * as Pos from '../Shared/ModalWindow';

/* Define style for component*/
// const Container = styled.div`
//   display: grid;
//   ${'' /* max-height: 25vh;
//   min-height:auto; */}
//   max-width: 30vw;
//   min-width: 50vw;
//   ${'' /* color: black; */}
//   grid-template-rows: 1fr;
//   grid-template-columns: repeat(5, 1fr);
//   grid-template-areas:
//     "p1 p2 p3 p4 p5";
//   align-items: start;
//   grid-gap: 0.05rem;
//  `;

 const ContainerFlex = styled.div`
    margin:10px;
    ${'' /* cursor: pointer; */}
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 12px;
 `;

const Photo = styled.span`
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

  return (
    <ContainerFlex>
      {images.map((img) => {
        return <Photo onClick={() => { handleImgClick(img) }}><img className='border' src={img} alt="img" width="100" height="80" /></Photo>
      })}
      {/* {images[0] && <P1 onClick={() => { handleImgClick(images[0]) }}><img className='border' src={images[0]} alt="img" width="100" height="80" /></P1>}
      {images[1] && <P2 onClick={() => { handleImgClick(images[1]) }}><img className='border' src={images[1]} alt="img" width="100" height="80" /></P2>}
      {images[2] && <P3 onClick={() => { handleImgClick(images[2]) }}><img className='border' src={images[2]} alt="img" width="100" height="80" /></P3>}
      {images[3] && <P4 onClick={() => { handleImgClick(images[3]) }}><img className='border' src={images[3]} alt="img" width="100" height="80" /></P4>}
      {images[4] && <P5 onClick={() => { handleImgClick(images[4]) }}><img className='border' src={images[4]} alt="img" width="100" height="80" /></P5>} */}

      <ModalWindow
        show={show}
        url={url}
        handleClose={hideModal}
        usage='image'
        openPos={Pos.CM_CENTER_CENTER}>
      </ModalWindow>
    </ContainerFlex>
  );
}

