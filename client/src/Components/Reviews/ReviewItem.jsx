import { React, useState, useEffect } from 'react';
import StarHandler from '../Shared/StarHandler.jsx';

export default function ReviewItem({ review, renderedProduct, rating}) {

  return (
    <div className="review-item">
      <StarHandler renderedProduct={renderedProduct} single={rating} />
      <p>
        Date:
        {review.date}
      </p>
      <h3>
        Body:
        {review.body}
      </h3>
      <p>
        Summary:
        {review.summary}
      </p>
      <p>
        Reviewer:
        {review.reviewer_name}
      </p>
      <div>
        {/* {photos.length > 0 ? photos.map((photo) =>
           <img src={photo.url} alt="reviewPhoto" />
        ) : <div>Hi</div>
        } */}
      </div>
      <p>{review.recommend ? 'I would recommend this product' : 'I would not recommend this product.'}</p>

    </div>
  );
}

