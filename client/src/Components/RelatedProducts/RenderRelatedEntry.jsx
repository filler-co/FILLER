import {React, useState} from 'react';
const RenderRelatedEntry = ({changeRenderedProduct, relatedId, setRevNum, setqNum }) => {

// add setQNum
  return (
    <div onClick={(e) => { changeRenderedProduct(relatedId); setRevNum(2); setqNum(10)}}>
      <div>{relatedId}</div>
    </div>
  );
};

export default RenderRelatedEntry;