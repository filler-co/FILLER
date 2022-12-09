import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';
import ProductDetailModalWindow from '../Shared/ProductDetailModal';
import * as Pos from '../Shared/ModalWindow';

const ImageContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-rows: 0.8fr, 0.2fr;
  grid-template-columns: 1fr, 1fr, 1fr, 1fr, 1fr;
  grid-gap: 2rem;
  z-index: 6;
  place-items: center;
  height: 100%;
`;

const SelectedImage = styled.img`
  max-height: 500px;
  object-fit: cover;
  margin: 0 auto;
  grid-column: 1 / -1;
  grid-row: 1/ -1;
  z-index: 1;
`;

const GalleryDiv = styled.div`
  grid-row: 2 / -1;
  grid-column: 1 / -1;
  z-index: 8;
  margin-top: auto;
  display:flex;
  align-items: center;
  backdrop-filter: blur(2px);
  height: 20%;

`;

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

const FullViewDiv = styled.div`
  grid-column: 1/-1;
  grid-row: 1/-1;
  z-index: 8;
  margin-bottom: auto;
  margin-left: auto;
`;

export default function StyleImage({selectedStylePhotos}) {
  const [selectedPhoto, setSelectedPhoto] = React.useState({});
  const [galleryList, setGalleryList] = React.useState({});
  const [centerImg, setCenterImg] = React.useState(0);
  const [leftImg, setLeftImg] = React.useState(-1);
  const [rightImg, setRightImg] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [url, setUrl] = React.useState('');

  const showModal = () => {
      setUrl(selectedPhoto.url)
      setShow(true);
  };
  const hideModal = (arg) => {
      setShow(false);
  };
  const handleClick = (url) => {
    showModal();
  }
  React.useEffect(() => {
    if (selectedStylePhotos && selectedStylePhotos.length > 0) {
      setSelectedPhoto(selectedStylePhotos[0]);
      setGalleryList(selectedStylePhotos.reduce((acc, urlobj, index) => { acc[index] = urlobj; return acc; }, {}))
      setCenterImg(0);
      setRightImg(1);
      setLeftImg(-1);
    }
  }, [selectedStylePhotos]);

  const shiftGallery = (dir) => {
    setCenterImg(centerImg+dir);
    setLeftImg(leftImg+dir);
    setRightImg(rightImg+dir);
  };

  const changeImg = (pos) => {
    setCenterImg(pos);
    setLeftImg(pos-1);
    setRightImg(pos+1);
    setSelectedPhoto(galleryList[pos]);
    setUrl(galleryList[pos].url)
  }
  return (
    <ImageContainer>
      <SelectedImage onClick={showModal} src={selectedPhoto.url} alt="NO PHOTOS" />
      <FullViewDiv>
        <button onClick={handleClick}>O</button>
      </FullViewDiv>
      <GalleryDiv>
        <ScrollLeftDiv>
          <ScrollLeftButton onClick={() => shiftGallery(-1)} active={!galleryList[leftImg]}>{'<'}</ScrollLeftButton>
        </ScrollLeftDiv>
        <LeftImageDiv>
          {galleryList[leftImg] && (
            <LeftImage onClick={() => changeImg(leftImg)} active={galleryList[leftImg].url === selectedPhoto.url} src={galleryList[leftImg].thumbnail_url} alt="N/A" />
          )}
        </LeftImageDiv>
        <CenterImageDiv>
          {galleryList[centerImg] && (
            <CenterImage onClick={() => changeImg(centerImg)} active={galleryList[centerImg].url === selectedPhoto.url} src={galleryList[centerImg].thumbnail_url} alt="N/A" />
          )}
        </CenterImageDiv>
        <RightImageDiv>
          {galleryList[rightImg] && (
            <RightImage onClick={() => changeImg(rightImg)} active={galleryList[rightImg].url === selectedPhoto.url} src={galleryList[rightImg].thumbnail_url} alt="N/A" />
          )}
        </RightImageDiv>
        <ScrollRightDiv>
          <ScrollRightButton active={!galleryList[rightImg]} onClick={() => shiftGallery(1)}>{'>'}</ScrollRightButton>
        </ScrollRightDiv>
      </GalleryDiv>
      <ProductDetailModalWindow
        show={show}
        url={url}
        handleClose={hideModal}
        openPos={Pos.CM_CENTER_CENTER}
        galleryList={galleryList}>
      </ProductDetailModalWindow>
    </ImageContainer>
  );
}
