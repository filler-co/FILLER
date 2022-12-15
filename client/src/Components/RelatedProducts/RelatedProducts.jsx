import React from 'react';
import axios from 'axios';
import token from './../../../../config.js';
import RenderRelatedEntry from './RenderRelatedEntry.jsx';
import styled from 'styled-components';


const Message = styled.div`
font-size : 0.8em;
font-weight: bold;
margin-top : 0.7em;
color: black;
${'' /* padding-bottom: 0.8em; */}
`


export default function RelatedProducts({productId, changeRenderedProduct, setRevNum, setqNum, setRevCount}) {
  const [relatedList, setRelatedList] = React.useState([]);


  React.useEffect(() => {
    if (productId) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/related`, { headers: { Authorization: token.TOKEN } })
      .then((data) => setRelatedList(data.data));
    }
  }, [productId]);



  return (
    <div className="related-products-container" style={{"maxWidth": "75rem",
      "margin": 'auto'}}>
          <Message>RELATED PRODUCTS</Message>
      {relatedList.map((relatedId, index) =>
      { return (
      <RenderRelatedEntry
        changeRenderedProduct={changeRenderedProduct}
        key={index}
        relatedId={relatedId}
        setRevNum={setRevNum}
        setqNum={setqNum}
        setRevCount={setRevCount}
      />
      ) })}
    </div>

  )
};