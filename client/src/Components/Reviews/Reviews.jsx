import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import MoreButton from '../Shared/MoreButton.jsx';
import ProductBreakdown from './ProductBreakdown.jsx'
import CreateReview from './CreateReview.jsx'

import styled, { css } from 'styled-components';

import token from '../../../../config';

const ReviewContainer = styled.div`
display: grid;
max-height: 100%;
background: #d5bdaf;
grid-template-columns: .35fr .65fr;
grid-template-rows: .1fr .4fr .4fr .1fr;
grid-template-areas:
  "review-header review-header"
  "ratings-breakdown review-list"
  "product-breakdown review-list"
  "review-buttons review-buttons";
text-align: left;
grid-gap: .5rem;
`
;
const PBreakdown = styled.div`
grid-area: product-breakdown;
background: #d6ccc2;
margin: 5px;
padding: 5px;
`

  const RBreakdown = styled.div`
  grid-area: ratings-breakdown;
  background: #d6ccc2;
  margin: 5px;
  padding: 5px;
  `;

  const RList = styled.div`
  grid-area: review-list;
  background: cornflowerblue;
  border: solid black 1px;
  margin: 5px;
  min-height: 450px;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  `;

  const RButtons = styled.div`
  grid-area: review-buttons;
  background: #d6ccc2;
  margin: 5px;
  display: flex;
  border-radius: 10px;
  justify-content: space-around;
  `;

  const RHeader = styled.div`
  grid-area: review-header;
  backgroud-color: #d6ccc2;
  text-align: center;
  `;




export default function Reviews({ renderedProduct, revNum, setRevNum }) {
  const [reviewList, setReviewList] = useState([]);
  const id = renderedProduct.id



  const getProductReview = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&count=${revNum}&sort=newest`, { headers: { Authorization: token.TOKEN } })
    .then((data) => { setReviewList(data.data.results); })
    .catch((err) => console.log(err));
  };

  useEffect(() => {if (renderedProduct.id) {getProductReview()}}, [revNum, renderedProduct.id])


  return (
    <ReviewContainer>
      <RHeader>
    <h2>Ratings & Reviews</h2>
      </RHeader>
      <RBreakdown>
      <RatingsBreakdown renderedProduct={renderedProduct} />
      </RBreakdown>
      <PBreakdown>
        <ProductBreakdown />
      </PBreakdown>
      <RList>
      {reviewList.length > 0 ? reviewList.map((review, idx) => (
        <ReviewItem
          key={idx}
          rating={review.rating}
          renderedProduct={renderedProduct}
          review={review}
        />
      )) : (
        <nav>
          <h2>
            Loading Reviews
          </h2>
        </nav>
      )}
      </RList>
      <RButtons>
      <MoreButton buttonName={'Get More Reviews'} actionNeed={getProductReview} revNum={revNum} setRevNum={setRevNum} qNum={false}/>
      <CreateReview />
      </RButtons>
    </ReviewContainer>
  );
}
