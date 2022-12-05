import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx'

import token from '../../../../config';

export default function Reviews({ renderedProduct }) {
  const [reviewList, setReviewList] = useState([]);
  const [reviewNum, setReviewNum] = useState('2');
  const id = renderedProduct.id || '40344';

  const getProductReview = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&count=${reviewNum}`, { headers: { Authorization: token.TOKEN } })
      .then((data) => { setReviewList(data.data.results); })
      .catch((err) => console.log(err));
  };

  useEffect(() => { getProductReview(); }, [renderedProduct.id, reviewNum]);

  const moreReviews = (e) => {
    e.preventDefault();
    setReviewNum(Number(reviewNum) + 2);
    getProductReview();
  };

  return (
    <div className="review-container">
      <h2>Ratings & Reviews</h2>
      <RatingsBreakdown renderedProduct={renderedProduct} />
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
      <button type="submit" onClick={(e) => { moreReviews(e); }}>
        Get More Reviews
      </button>
    </div>
  );
}
