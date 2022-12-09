import React, {useRef} from "react";
import styled from "styled-components";
import {CM_CENTER_CENTER, CM_TOP_CENTER, CM_TOP_LEFT, CM_TOP_RIGHT} from "./ModalWindow";
// import useEscapeKey from "../hooks/useEscapeKey";
// import useOutsideClick from "../hooks/useOutsideClick";

// These are private components

// Modal background layer - visible or invisible, but always floating above client's elements
const Model = styled.div`
    z-index: 999;
    display: ${({show}) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width:100%;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(3px);
`;

// Rendered popup - a positional demo confirmation box
const Container = styled.div`
    position:fixed;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    top: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: '50%',
        [CM_TOP_LEFT]: '10%',
        [CM_TOP_CENTER]: '10%',
        [CM_TOP_RIGHT]: '10%'
    }[openPos])};

    left: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: '50%',
        [CM_TOP_LEFT]: '5%',
        [CM_TOP_CENTER]: '50%',
        [CM_TOP_RIGHT]: '95%'
    }[openPos])};

    transform: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: 'translate(-50%,-50%)',
        [CM_TOP_LEFT]: 'translate(0,0)',
        [CM_TOP_CENTER]: 'translate(-50%,0)',
        [CM_TOP_RIGHT]: 'translate(-100%,0)'
    }[openPos])};

    border-radius: 10px;
    padding: 0.75rem;
    color: rgba(0,0,139, 0.9);
`;

const Button = styled.button`
    background-color: grey;
    color: ${({primary}) => (primary ? 'white' : 'white')};
    border: solid 2px #9f7500;
    border-radius: 8px;
    width: 5.0rem;
    padding: 0.2rem;
    margin: 0.2rem;
    font-size: 1rem;
`;

const ImageDiv = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    border: none;
    ${'' /* background-color: rgba(80,80,150, 0.4); */}
`;

const ButtonBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
`;

const Image = styled.img`
  max-height: 75%;
`;
const GalleryBar = styled.div`
  z-index: 999;
  display: flex;
  flex-direction: row;
  position: relative;
  top: -300px;

`;

;

const ScrollLeftDiv = styled.div`
  width: 20%;
`;

const ScrollLeftButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;

  ${({ active }) => active && `
    disable: true;
    pointer-events: none;
  `}

`;

const ScrollRightDiv = styled.div`
  width: 20%;
`;

const ScrollRightButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;

  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  `}
`;

const LeftImageDiv = styled.div`
  width: 20%;
  padding: 3%;
`;

const LeftImage = styled.img`
  cursor: pointer;
  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  border: solid 2px white;
  `}
`;

const CenterImageDiv = styled.div`
  width: 20%;
  padding: 3%;
`;

const CenterImage = styled.img`
  cursor: pointer:

  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  border: solid 2px white;
  `}
`;

const RightImageDiv = styled.div`
  width: 20%;
  padding: 3%;
`;

const RightImage = styled.img`
  cursor: pointer;
  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  border: solid 2px white;
  `}
`;

export default function ConfirmationModalImpl(props) {
    const {
        handleClose, // renderProp fn returns true or false
        show, // boolean - visible/invisible
        url,
        openPos,
        galleryList // symbol for placement
    } = { ...props };

    const [centerImg, setCenterImg] = React.useState(0);
    const [leftImg, setLeftImg] = React.useState(-1);
    const [rightImg, setRightImg] = React.useState(1);
    const [mainImg, setMainImg] = React.useState(url);

    React.useEffect(() => {
        if (galleryList && galleryList[0]) {
          setMainImg(url);
        //   setGalleryList(selectedStylePhotos.reduce((acc, urlobj, index) => { acc[index] = urlobj; return acc; }, {}))
          setCenterImg(0);
          setRightImg(1);
          setLeftImg(-1);
        }
      }, [url]);

    const changeImg = (pos) => {
        setCenterImg(pos);
        setLeftImg(pos-1);
        setRightImg(pos+1);
        setMainImg(galleryList[pos].url);
    }

    const shiftGallery = (dir) => {
        setCenterImg(centerImg+dir);
        setLeftImg(leftImg+dir);
        setRightImg(rightImg+dir);
      };

    // const sendYes = () => handleClose(true);

    const closeWindow = () => handleClose(false);

    // useEscapeKey(sendNo);

    // const ref = useRef(null);
    // useOutsideClick(sendNo, ref);
    return (
        <Model show={show}>
            <Container openPos={openPos} >
            <ButtonBar>
                    <Button onClick={closeWindow} primary={false}>X</Button>
                </ButtonBar>
            <ImageDiv><Image src={mainImg} alt="..." /></ImageDiv>
            <GalleryBar>
                <ScrollLeftDiv>
                    <ScrollLeftButton onClick={() => shiftGallery(-1)} active={!galleryList[leftImg]}>{'<'}</ScrollLeftButton>
                </ScrollLeftDiv>
                <LeftImageDiv>
                    {galleryList[leftImg] && (
                    <LeftImage onClick={() => changeImg(leftImg)} active={galleryList[leftImg].url === mainImg} src={galleryList[leftImg].thumbnail_url} alt="N/A" />
                    )}
                </LeftImageDiv>
                <CenterImageDiv>
                    {galleryList[centerImg] && (
                    <CenterImage onClick={() => changeImg(centerImg)} active={galleryList[centerImg].url === mainImg} src={galleryList[centerImg].thumbnail_url} alt="N/A" />
                     )}
                </CenterImageDiv>
                <RightImageDiv>
                    {galleryList[rightImg] && (
                    <RightImage onClick={() => changeImg(rightImg)} active={galleryList[rightImg].url === mainImg} src={galleryList[rightImg].thumbnail_url} alt="N/A" />
                    )}
                    </RightImageDiv>
                <ScrollRightDiv>
                    <ScrollRightButton active={!galleryList[rightImg]} onClick={() => shiftGallery(1)}>{'>'}</ScrollRightButton>
                </ScrollRightDiv>
            </GalleryBar>
            </Container>
        </Model>
    );
}
