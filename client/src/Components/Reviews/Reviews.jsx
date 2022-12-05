import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx'
import RenderRelatedEntry from '../RelatedProducts/RenderRelatedEntry.jsx'
import styled from 'styled-components';

import token from '../../../../config';


const RScroll = styled.div`
overflow-y: scroll;
scroll-behaviour: smooth;
`;

export default function Reviews({ renderedProduct }) {
  const [reviewList, setReviewList] = useState([]);
  const [reviewNum, setReviewNum] = useState(2);
  const [count, setCount] = useState(['rerender'])
  const id = renderedProduct.id


  const getProductReview = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&count=${reviewNum}&sort=newest`, { headers: { Authorization: token.TOKEN } })
      .then((data) => { setReviewList(data.data.results); })
      .catch((err) => console.log(err));
  };



  const moreReviews = (e) => {
    e.preventDefault();
    setReviewNum(reviewNum + 2);
    getProductReview();
  };
  useEffect(() => {getProductReview()}, [renderedProduct.id, reviewNum])





  return (
    <div className="review-container">
      <h2>Ratings & Reviews</h2>
      <RatingsBreakdown renderedProduct={renderedProduct} />
      <RScroll>
      {reviewList.length > 0 ? reviewList.map((review, idx) => (
        <ReviewItem
          key={idx}
          summary={review.summary}
          body={review.body}
          reviewer={review.reviewer_name}
          date={review.date}
          recommend={review.recommend}
          photos={review.photos}
          rating={review.rating}
          renderedProduct={renderedProduct}
        />
      )) : (
        <nav>
          <h2>
            Loading Reviews
          </h2>
        </nav>
      )}
      </RScroll>
      <button type="submit" onClick={(e) => { moreReviews(e) }}>
        Get More Reviews
      </button>
    </div>
  );
}
