import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import MoreButton from '../Shared/MoreButton.jsx';
import RenderRelatedEntry from '../RelatedProducts/RenderRelatedEntry.jsx'

import styled from 'styled-components';

import token from '../../../../config';


export default function Reviews({ renderedProduct, num, setNum }) {
  const [reviewList, setReviewList] = useState([]);
  const id = renderedProduct.id


  const getProductReview = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&count=${num}&sort=newest`, { headers: { Authorization: token.TOKEN } })
      .then((data) => { setReviewList(data.data.results); })
      .catch((err) => console.log(err));
  };

  useEffect(() => {if (renderedProduct.id) {getProductReview()}}, [renderedProduct.id, num])

  return (
    <div className="review-container">
      <h2>Ratings & Reviews</h2>
      <RatingsBreakdown renderedProduct={renderedProduct} />
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
      <MoreButton buttonName={'Get More Reviews'} actionNeed={getProductReview} num={num} setNum={setNum}/>
    </div>
  );
}
