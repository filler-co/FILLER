import React, {useRef} from "react";
import styled from "styled-components";
import {CM_CENTER_CENTER, CM_TOP_CENTER, CM_TOP_LEFT, CM_TOP_RIGHT} from "./ModalWindow";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
// import useEscapeKey from "../hooks/useEscapeKey";
// import useOutsideClick from "../hooks/useOutsideClick";

// These are private components

// Modal background layer - visible or invisible, but always floating above client's elements
const Model = styled.div`
    z-index: 99;
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
    cursor: pointer;
    background: none;
    color: rgb(255,255,255,0.8);
    border: solid 2px white;
    font-weight: bold;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
    &:hover{
      color: white;
    }

`;

const ImageDiv = styled.div`
    width: auto;
    height: 90vh;
    align-items: flex-start;
    border: none;
    z-index: 100;
    overflow: hidden;


    ${'' /* background-color: rgba(80,80,150, 0.4); */}
`;

const NextImgDiv = styled.div`
  z-index: 7;

`;

const ButtonBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
`;

const Image = styled.img`
  max-height: 80%;
  cursor: zoom-in;
`;

const ZoomImage = styled.img`
  max-height: 80%;


  &:hover {
    cursor: zoom-out;
    transform: scale(2.5) translate(${(props)=>(props.xCoor).toString()}%,${(props)=>(props.yCoor).toString()}% );
  }
`;
const GalleryBar = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  top: -110px;
  height: 10%;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 103;

`;

;

const ScrollLeftDiv = styled.div`
  width: 15%;
`;

const ScrollLeftButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  font-size: 15px;
  color: white;

  &:hover {
    font-size: 20px;
  }

  ${({ active }) => active && `
    disable: true;
    pointer-events: none;
  `}

`;

const ScrollRightDiv = styled.div`
  width: 15%;
`;

const ScrollRightButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: white;
  font-size: 15px;

  &:hover {
    font-size: 20px;
  }

  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  `}
`;

const GalleryImageDiv = styled.div`
  width: 12%;
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

const CenterImage = styled.img`
  cursor: pointer:

  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  border: solid 2px white;
  `}
`;

const RightImage = styled.img`
  cursor: pointer;
  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  border: solid 2px white;
  `}
`;

const LeftScrollSpan = styled.span`
    cursor: pointer;
    border: none;
    background: none;
    width: 25%;
    height: 75%;
    z-index: 101;
    left: 0%;
    position: absolute;

    ${({ active }) => active && `
    disable: true;
    pointer-events: none;
    `}
`;

const RightScrollSpan = styled.span`
    cursor: pointer;
    border: none;
    background: none;
    width: 25%;
    height: 75%;
    z-index: 101;
    right: 0%;
    position: absolute;

    ${({ active }) => active && `
    disable: true;
    pointer-events: none;
    `}
`;

export default function ConfirmationModalImpl(props) {
    const {
        handleClose, // renderProp fn returns true or false
        show, // boolean - visible/invisible
        url,
        openPos,
        galleryList,
        centerVal
    } = { ...props };

    const [centerImg, setCenterImg] = React.useState(centerVal);
    const [leftImg, setLeftImg] = React.useState(centerVal-1);
    const [rightImg, setRightImg] = React.useState(centerVal+1);
    const [mainImgUrl, setMainImgUrl] = React.useState(url);
    const [mainImg, setMainImg] = React.useState(centerVal);
    const [zoomMode, setZoomMode] = React.useState(false);

    React.useEffect(() => {
        if (galleryList && galleryList[0]) {
          setMainImgUrl(url);
          setMainImg(centerVal);
        //   setGalleryList(selectedStylePhotos.reduce((acc, urlobj, index) => { acc[index] = urlobj; return acc; }, {}))
          setCenterImg(centerVal);
          setRightImg(centerVal+1);
          setLeftImg(centerVal-1);
          setZoomMode(false);
        }
      }, [url, show]);

    const changeImg = (pos) => {
        setCenterImg(pos);
        setLeftImg(pos-1);
        setRightImg(pos+1);
        setMainImgUrl(galleryList[pos].url);
        setZoomMode(false);
        setMainImg(pos);
    }

    const shiftGallery = (img) => {
        setCenterImg(img);
        setLeftImg(img-1);
        setRightImg(img+1);
      };

    // const sendYes = () => handleClose(true);

    const closeWindow = () => handleClose(false);
    const [xCoor, setXCoor ] = React.useState(0);
    const [yCoor, setYCoor] = React.useState(0);

    const getCursorCoord = (e) => {
      setXCoor(e.pageX);
      setYCoor(e.pageY);
    }

    // useEscapeKey(sendNo);

    // const ref = useRef(null);
    // useOutsideClick(sendNo, ref);
    return (
        <Model show={show}>
            <Container openPos={openPos} >
            <ButtonBar>
                    <Button onClick={closeWindow} primary={false}>X</Button>
                </ButtonBar>
            <ImageDiv zoomMode={zoomMode}>
                <LeftScrollSpan onClick={() => {shiftGallery(mainImg-1); setMainImgUrl(galleryList[mainImg-1].url); setMainImg(mainImg-1); setZoomMode(false); }} active={!galleryList[mainImg-1]}></LeftScrollSpan>
                <RightScrollSpan active={!galleryList[mainImg+1]} onClick={() => {shiftGallery(mainImg+1); setMainImgUrl(galleryList[mainImg+1].url); setMainImg(mainImg+1); setZoomMode(false); }}></RightScrollSpan>
                {/* <MagnifierDiv>
                  <Magnifier src={mainImgUrl} width='auto' height='80vh' max-height='80%' mgShape='square' mgWidth={200} mgHeight={200}/>
                </MagnifierDiv> */}
                {zoomMode && (
                  <ZoomImage src={mainImgUrl} zoomMode={zoomMode} onClick={() => {setZoomMode(!zoomMode);}} onMouseMove={getCursorCoord} xCoor={((window.innerWidth/2)-xCoor)*.13} yCoor={((window.innerHeight/2)-yCoor)*.13} alt="..." />
                )}
                {!zoomMode && (
                  <Image src={mainImgUrl} zoomMode={zoomMode} onClick={() => {setZoomMode(!zoomMode);}} onMouseMove={getCursorCoord} xCoor={((window.innerWidth/2)-xCoor)*.13} yCoor={((window.innerHeight/2)-yCoor)*.13} alt="..." />
                )}
            </ImageDiv>
            <GalleryBar>
                <ScrollLeftDiv>
                    <ScrollLeftButton onClick={() => shiftGallery(centerImg-1)} active={!galleryList[leftImg]}><FontAwesomeIcon icon={faChevronLeft} /></ScrollLeftButton>
                </ScrollLeftDiv>
                <GalleryImageDiv>
                    {galleryList[leftImg] && (
                    <LeftImage onClick={() => changeImg(leftImg)} active={galleryList[leftImg].url === mainImgUrl} src={galleryList[leftImg].thumbnail_url} alt="N/A" />
                    )}
                </GalleryImageDiv>
                <GalleryImageDiv>
                    {galleryList[centerImg] && (
                    <CenterImage onClick={() => changeImg(centerImg)} active={galleryList[centerImg].url === mainImgUrl} src={galleryList[centerImg].thumbnail_url} alt="N/A" />
                     )}
                </GalleryImageDiv>
                <GalleryImageDiv>
                    {galleryList[rightImg] && (
                    <RightImage onClick={() => changeImg(rightImg)} active={galleryList[rightImg].url === mainImgUrl} src={galleryList[rightImg].thumbnail_url} alt="N/A" />
                    )}
                    </GalleryImageDiv>
                <ScrollRightDiv>
                    <ScrollRightButton active={!galleryList[rightImg]} onClick={() => shiftGallery(centerImg+1)}><FontAwesomeIcon icon={faChevronRight} /></ScrollRightButton>
                </ScrollRightDiv>
            </GalleryBar>
            </Container>
        </Model>
    );
}
