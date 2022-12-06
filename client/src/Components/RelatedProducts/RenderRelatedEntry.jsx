import {React, useState} from 'react';
const RenderRelatedEntry = ({changeRenderedProduct, relatedId, setRevNum }) => {

// add setQNum
  return (
    <div onClick={(e) => { changeRenderedProduct(relatedId); setRevNum(2)}}>
      <div>{relatedId}</div>
    </div>
  );
};

export default RenderRelatedEntry;