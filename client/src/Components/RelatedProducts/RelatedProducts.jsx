import React from 'react';
import axios from 'axios';
import token from './../../../../config.js';
import RenderRelatedEntry from './RenderRelatedEntry.jsx';

export default function RelatedProducts({productId, changeRenderedProduct}) {
  const [relatedList, setRelatedList] = React.useState([]);


  React.useEffect(() => {
    if (productId) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/related`, { headers: { Authorization: token.TOKEN } })
      .then((data) => setRelatedList(data.data));
    }
  }, [productId]);



  return (
    <div className="related-products-container">
      {relatedList.map((relatedId, index) =>
      { return (
      <RenderRelatedEntry
        changeRenderedProduct={changeRenderedProduct}
        key={index}
        relatedId={relatedId}
      />
      ) })}
    </div>

  )
};