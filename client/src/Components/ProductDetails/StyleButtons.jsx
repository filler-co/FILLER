import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';
import StyleButtonEntry from './StyleButtonEntry.jsx';

const StyleButtonsContainer = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
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
