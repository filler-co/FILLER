import React from 'react';
import StarHandler from '../Shared/StarHandler.jsx';

export default function RatingsBreakdown({ renderedProduct }) {
  const num = true;

  return (
    <StarHandler renderedProduct={renderedProduct} num={num} single={false}/>
  );
}
