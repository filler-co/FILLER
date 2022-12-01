import React from 'react';

const RenderRelatedEntry = ({changeRenderedProduct, relatedId}) => {

  return (
    <div onClick={(e) => {changeRenderedProduct(relatedId)}}>
      <div>{relatedId}</div>
    </div>
  )
};

export default RenderRelatedEntry;