import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import MoreButton from '../Shared/MoreButton.jsx';
import ProductBreakdown from './ProductBreakdown.jsx'
import CreateReview from './CreateReview.jsx';
import FilterBy from './FilterBy.jsx';

import styled, { css } from 'styled-components';

import token from '../../../../config';

const ReviewContainer = styled.div`
display: grid;

max-height: 80vh;
grid-template-columns: .25fr .75fr;
grid-template-rows: .3fr .3fr .3fr .1fr;
grid-template-areas:
  "review-header review-header"
  "ratings-breakdown review-list"
  "product-breakdown review-list"
  "prooduct-breakdown review-buttons";
text-align: left;
`
;
const PBreakdown = styled.div`
grid-area: product-breakdown;

max-height: 35vh;
margin: 5px;
padding: 5px;
`

  const RBreakdown = styled.div`
  grid-area: ratings-breakdown;

  margin: 5px;
  padding: 5px;
  `;

  const RList = styled.div`
  grid-area: review-list;
  border-left: solid black 1px;
  margin: 5px;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
  `;

  const RButtons = styled.div`
  grid-area: review-buttons;
  margin: 5px;
  display: flex;
  max-height: 10rem;
  border-radius: 10px;
  justify-content: space-between;
  align-items: start
  `;

  const RHeader = styled.div`
  grid-area: review-header;
  text-align: center;
  `;




export default function Reviews({ renderedProduct, revNum, setRevNum, refProp }) {
  const [reviewList, setReviewList] = useState([]);
  const [sortState, setSortState] = useState('relevant')
  const [filterList, setFilterList] = useState([]);
  const [filterByRating, setFilterByRating] = useState(false)
  const [breakdownList, setBreakdownList] = useState([])
  const [totalRevs, setTotalRevs] = useState(0)
  const id = renderedProduct.id


const uRl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=${id}&sort=${sortState}&count=${revNum}`
  const getProductReview = () => {
    axios.get(uRl, { headers: { Authorization: token.TOKEN } })
    .then((data) => { setReviewList(data.data.results); })
    .catch((err) => console.log(err));
  };

  useEffect(() => {if (renderedProduct.id) {getProductReview()}}, [revNum, renderedProduct.id, sortState, filterList])


  reviewList.map((item) => {
    item.display = true;
  })




  return (
    <ReviewContainer ref={refProp}>
      <RHeader>
    <h2>Ratings & Reviews</h2>
        <FilterBy renderedProduct={renderedProduct} reviewList={reviewList} sortState={sortState} setSortState={setSortState} setFilterList={setFilterList} filterList={filterList} filterByRating={filterByRating} setFilterByRating={setFilterByRating} setTotalRevs={setTotalRevs} totalRevs={totalRevs}
        />
      </RHeader>
      <RBreakdown>
      <RatingsBreakdown renderedProduct={renderedProduct} reviewList={reviewList} setReviewList={setReviewList}  setFilterByRating={setFilterByRating} breakdownList={breakdownList} setBreakdownList={setBreakdownList}/>
      </RBreakdown>
      <PBreakdown>
        <ProductBreakdown renderedProduct={renderedProduct} />
      </PBreakdown>
      <RList>
      {reviewList.length > 0  && !filterByRating ?  reviewList.map((review, idx) => (
        <ReviewItem
          key={idx}
          rating={review.rating}
          renderedProduct={renderedProduct}
          review={review}
        />
        )) : breakdownList.map((review, idx) => (
          <ReviewItem
            key={idx}
            rating={review.rating}
            renderedProduct={renderedProduct}
            review={review}
          />
          ))}
      </RList>
      <RButtons>
        {<MoreButton buttonName={'MORE REVIEWS'} actionNeed={getProductReview} revNum={revNum} setRevNum={setRevNum} qNum={false}/> }
      <CreateReview />
      </RButtons>
    </ReviewContainer>
  );
}