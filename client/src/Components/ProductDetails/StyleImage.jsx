import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

const ImageContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-rows: 0.8fr, 0.2fr;
  grid-template-columns: 1fr, 1fr, 1fr, 1fr, 1fr;
  grid-gap: 2rem;
  z-index: 1;
`;

const SelectedImage = styled.img`
  max-height: 500px;
  margin: 0 auto;
  grid-column: 1 / -1;
  grid-row: 1/ -1;
  z-index: 1;
`;

const GalleryDiv = styled.div`
  grid-row: 2 / -1;
  grid-column: 1 / 2;
  z-index: 3;
  margin-top: auto;
  display: flex;
  backdrop-filter: blur(2px);
`;

const ScrollLeftDiv = styled.div`
  width: 20%;
`;

const ScrollLeftButton = styled.button`

  ${({ active }) => active && `
    disable: true;
    pointer-events: none;
  `}

`;

const ScrollRightDiv = styled.div`
  width: 20%;
`;

const ScrollRightButton = styled.button`
  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  `}
`;

const LeftImageDiv = styled.div`
  width: 20%;
  padding: 3%;
`;

const CenterImageDiv = styled.div`
  width: 20%;
  padding: 3%;
`;

const RightImageDiv = styled.div`
  width: 20%;
  padding: 3%;
`;

export default function StyleImage({selectedStylePhotos}) {
  const [selectedPhoto, setSelectedPhoto] = React.useState({});
  const [galleryList, setGalleryList] = React.useState({});
  const [centerImg, setCenterImg] = React.useState(0);
  const [leftImg, setLeftImg] = React.useState(-1);
  const [rightImg, setRightImg] = React.useState(1);
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
  }
  return (
    <ImageContainer>
      <SelectedImage onClick={() => {console.log(galleryList)}} src={selectedPhoto.url} alt="NO PHOTOS" />
      <GalleryDiv>
        <ScrollLeftDiv>
          <ScrollLeftButton onClick={() => shiftGallery(-1)} active={!galleryList[leftImg]}>{'<'}</ScrollLeftButton>
        </ScrollLeftDiv>
        <LeftImageDiv>
          {galleryList[leftImg] && (
            <img src={galleryList[leftImg].thumbnail_url} alt="N/A" />
          )}
        </LeftImageDiv>
        <CenterImageDiv>
          {galleryList[centerImg] && (
            <img src={galleryList[centerImg].thumbnail_url} alt="N/A" />
          )}
        </CenterImageDiv>
        <RightImageDiv>
          {galleryList[rightImg] && (
            <img src={galleryList[rightImg].thumbnail_url} alt="N/A" />
          )}
        </RightImageDiv>
        <ScrollRightDiv>
          <ScrollRightButton active={!galleryList[rightImg]} onClick={() => shiftGallery(1)}>{'>'}</ScrollRightButton>
        </ScrollRightDiv>
      </GalleryDiv>

    </ImageContainer>
  );
}
