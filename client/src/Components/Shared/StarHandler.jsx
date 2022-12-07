import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalf, faStar} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styled, { css } from 'styled-components';

import token from '../../../../config';


const StyledStarHandler = styled.div`
display: grid;
grid-template-columns: .2fr .8fr;
grid-template-areas:
"rating stars";
`


const StyledRating = styled.p`
grid-area: rating;
font-size: 35px;
`
const StyledStars = styled.div`
grid-area: stars;
display: flex;
align-items: flex-start;

`


export default function StarHandler({ renderedProduct, num, single }) {
  // Star Handler takes 3 props, rendered product is the rendered product state, num is true
  // if you want to add the numerical rating; if you want to get the stars for a
  // single review pass the single prop the rating(1-5) or false if you do not want
  // a single review's rating
  const [currRatings, setCurrRatings] = useState([]);
  const starResult = [];
  let starNum = '';
  const getReviewMetaData = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
      .then((data) => { setCurrRatings(Object.entries(data.data.ratings)); })
      .catch((err) => console.log(err));
  };
  console.log('curr',currRatings)

  useEffect(() => { if(renderedProduct.id) {getReviewMetaData();}
  }, [renderedProduct.id]);

  const starGenerator = (starArr) => {
    let i = 0;
    while (i < starArr[0]) {
      starResult.push(<FontAwesomeIcon icon={faStar} />);
      i += 1;
    }
    if (starArr[1] >= 3 && starArr[1] <= 7) {
      starResult.push( <FontAwesomeIcon icon={faStarHalf} />);
    } else if (starArr[1] >= 7 ){
      starResult.push(faStar)
    }

  };

  if (typeof single === 'number') {
    starGenerator([single]);
  } else {
    const starRating = () => {
      // get avg star rating
      let sum = 0;
      let count = 0;
      for (let i = 0; i < currRatings.length; i += 1) {
        sum += (currRatings[i][0] * currRatings[i][1]);
        count += Number(currRatings[i][1]);
      }
      let result = (sum / count);
      if (Number.isNaN(result)) {
        result = undefined;
      } else {
        result = result.toString().split('.');
        result[1] = result[1].slice(0, 1);
        starNum = result.join('.');


        // produce the stars
        starGenerator(result);
      }
    };
    starRating();
  }

  return (
    <StyledStarHandler>
        {num ? <StyledRating>{starNum}</StyledRating>: ''}
      <StyledStars>
      {starResult.map((star, idx) => (
        <i key={idx}>
          {star}
        </i>
      ))}
      </StyledStars>
    </StyledStarHandler>
  );
}