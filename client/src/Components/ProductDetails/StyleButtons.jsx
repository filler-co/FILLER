import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';
import StyleButtonEntry from './StyleButtonEntry.jsx';

const StyleButtonsContainer = styled.div`
  display: inline-flex;
`;

export default function StyleButtons({selectedStyleId, productStyles, changeStyle}) {
  return (
    <StyleButtonsContainer>
      {productStyles.map((productStyle, index) => (
        <StyleButtonEntry
          key={productStyle.style_id}
          selectedStyleId={selectedStyleId}
          productStyle={productStyle}
          changeStyle={changeStyle}
        />
      ))}
    </StyleButtonsContainer>
  );
}
