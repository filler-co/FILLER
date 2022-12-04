import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';
import StyleButtonEntry from './StyleButtonEntry.jsx';

const StyleButtonsContainer = styled.div`
  display: block;
`;

export default function StyleButtons({selectedStyleId, productStyles, setSelectedStyle}) {
  return (
    <StyleButtonsContainer>
      {productStyles.map((productStyle, index) => (
        <StyleButtonEntry
          key={productStyle.style_id}
          selectedStyleId={selectedStyleId}
          productStyle={productStyle}
          setSelectedStyle={setSelectedStyle}
        />
      ))}
    </StyleButtonsContainer>
  );
}
