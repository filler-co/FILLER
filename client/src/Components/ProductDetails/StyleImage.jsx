import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

const ImageContainer = styled.div`
  align-items: center;
`;

const SelectedImage = styled.img`
  max-height: 500px;
  margin: 0 auto;
`;

export default function StyleImage({selectedStylePhotos}) {
  const [selectedPhoto, setSelectedPhoto] = React.useState({});
  const [galleryList, setGalleryList] = React.useState({});
  React.useEffect(() => {
    if (selectedStylePhotos && selectedStylePhotos.length > 0) {
      setSelectedPhoto(selectedStylePhotos[0]);
      setGalleryList(selectedStylePhotos.reduce((acc, urlobj, index) => { acc[index] = urlobj; return acc; }, {}))
    }
  }, [selectedStylePhotos]);
  return (
    <ImageContainer>
      <SelectedImage src={selectedPhoto.url} alt="NO PHOTOS" />
      <button onClick={() => {console.log(galleryList)}}>Gallery List Log</button>
    </ImageContainer>
  );
}
