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

  ${({ active }) => active && `
  disable: true;
  pointer-events: none;
  `}
`;

const SBDiv = styled.div`
  border-radius: 50%;
  height: 62px;
  width: 62px;

  ${({ active }) => !active && `
  &:hover {
    height: 60px;
    width: 60px;
    border: solid 2px black;
  }
  `}

  ${({ active }) => active && `
  height: 61px;
  width: 61px;
  border: solid 1px black;
  `}
`;

export default function StyleButtonEntry({ selectedStyleId, productStyle, changeStyle}) {
  return (
    <SBContainer>
      <SBButton active={productStyle.style_id === selectedStyleId} type="button" onClick={() => changeStyle(productStyle)}>
        <SBDiv active={productStyle.style_id === selectedStyleId} style={{ backgroundImage: `url(${productStyle.photos[0].thumbnail_url})`}} />
      </SBButton>
    </SBContainer>
  );
}
