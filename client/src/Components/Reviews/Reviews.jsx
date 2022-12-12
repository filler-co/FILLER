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
  margin: 5px;
  height: 75vh;
  overflow-x: hidden;
  overflow-y: scroll;
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

  console.log(totalRevs)



  return (
    <ReviewContainer ref={refProp}>
      <RHeader>
    <h2>Ratings & Reviews</h2>
        <FilterBy renderedProduct={renderedProduct} reviewList={reviewList} sortState={sortState} setSortState={setSortState} setFilterList={setFilterList} filterList={filterList} filterByRating={filterByRating} setFilterByRating={setFilterByRating} setTotalRevs={setTotalRevs}
        />
      </RHeader>
      <RBreakdown>
      <RatingsBreakdown renderedProduct={renderedProduct} reviewList={reviewList} setReviewList={setReviewList}  setFilterByRating={setFilterByRating} breakdownList={breakdownList} setBreakdownList={setBreakdownList}/>
      </RBreakdown>
      <PBreakdown>
        <ProductBreakdown />
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
        {revNum < totalRevs ? <MoreButton buttonName={'Get More Reviews'} actionNeed={getProductReview} revNum={revNum} setRevNum={setRevNum} qNum={false}/>: <div></div> }
      <CreateReview />
      </RButtons>
    </ReviewContainer>
  );
}