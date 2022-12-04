import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

export default function StyleImage({selectedStylePhotos}) {
  const [selectedPhoto, setSelectedPhoto] = React.useState({});
  React.useEffect(() => {
    if (selectedStylePhotos && selectedStylePhotos.length > 0) {
      setSelectedPhoto(selectedStylePhotos[0]);
    }
  }, [selectedStylePhotos]);
  return (
    <div>
      <img src={selectedPhoto.url} alt="NO PHOTOS" />
    </div>
  );
}
