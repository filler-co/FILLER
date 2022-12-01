import React from 'react';
import ReviewItem from './ReviewItem.jsx'
//import RatingsBreakdown from './RatingsBreakdown.jsx'

export default function Reviews({renderedProduct}) {



  return (
    <div className="reviews">
      <ReviewItem renderedProduct={renderedProduct} />
    </div>
  );
}
