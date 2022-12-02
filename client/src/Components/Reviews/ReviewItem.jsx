import { React, useState, useEffect } from 'react';
import axios from 'axios';




export default function ReviewItem({ summary, body, reviewer, date, recommend, photos}) {




  // state for summary
  console.log('rl', photos);

  return (
    <div className="review-item">
      <p>
        Date:
        {date}
      </p>
      <h3>
        Body:
        {body}
      </h3>
      <p>
        Summary:
        {summary}
      </p>
      <p>
        Reviewer:
        {reviewer}
      </p>
      <div>
        {photos.length > 0 ? photos.map((photo) =>
           <img src={photo.url} alt="reviewPhoto" />
        ) : <div>Hi</div>
        }
      </div>
      <p>{recommend ? 'I would recommend this product' : 'I would not recommend this product.'}</p>

    </div>
  );
}
