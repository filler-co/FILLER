import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

const USDSpan = styled.span`
  font-weight:bold;
  font-size: small;
`;

export default function StylePrice({selectedStyle}) {
  if (selectedStyle && selectedStyle.sale_price !== null) {
    return (
      <div>

        <span style={{color: '#ff1c9a'}}>{" $" + selectedStyle.sale_price}<USDSpan>USD </USDSpan></span>

        <span style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{"$" + selectedStyle.original_price}<USDSpan>USD</USDSpan></span>
      </div>
    );
  }
  return (
    <div>
      {" $" + selectedStyle.original_price}<USDSpan>USD</USDSpan>
    </div>
  );
}
