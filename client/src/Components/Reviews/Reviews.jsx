import { React, useState, useEffect } from 'react';
import axios from "axios";
import ReviewItem from './ReviewItem.jsx';

import token from '../../../../config.js';

export default function Reviews({ renderedProduct }) {
  const [reviewList, setReviewList] = useState([]);

  // state fro body

  // get request to the current product id

  const getProductReview = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=40344', { headers: { Authorization: token.TOKEN } })
      .then((data) => { setReviewList(data.data.results); console.log('data', data.data.results); })
      .catch((err) => console.error(err));
  };

  useEffect(() => { getProductReview(); }, []);

  return (
    <div className="review-container">
      <h2>Reviews</h2>

      {reviewList.length > 0 ? reviewList.map((review) => (
        <ReviewItem
          summary={review.summary}
          body={review.body}
          reviewer={review.reviewer_name}
          date={review.date}
          recommend={review.recommend}
          photos={review.photos}
        />
      )) : <div />}
    </div>
  );
}
