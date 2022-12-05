import {React, useState} from 'react';
const RenderRelatedEntry = ({changeRenderedProduct, relatedId, setNum }) => {


  return (
    <div onClick={(e) => { changeRenderedProduct(relatedId), setNum(2)}}>
      <div>{relatedId}</div>
    </div>
  );
};

export default RenderRelatedEntry;