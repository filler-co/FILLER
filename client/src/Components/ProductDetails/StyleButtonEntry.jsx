import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

const SBContainer = styled.div`
  padding: 0.25rem;
  margin: 0.25rem;
`;

const SBButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
`;

export default function StyleButtonEntry({ selectedStyleId, productStyle, changeStyle}) {
  return (
    <SBContainer>
      <SBButton type="button" onClick={() => changeStyle(productStyle)}>
        <div style={{ backgroundImage: `url(${productStyle.photos[0].thumbnail_url})`, borderRadius: '50%', width: '40px', height: '40px'}} />
      </SBButton>
    </SBContainer>
  );
}
