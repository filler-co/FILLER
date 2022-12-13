import { React, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import StarHandler from '../Shared/StarHandler.jsx';


const ReviewItemContainer = styled.div`
display: grid;

grid-template-columns: .50fr .50fr;
grid-template-rows: .3fr .7fr ;
grid-template-areas:
"star-render user-date"
"review-body review-body";
`
  const StarItem = styled.div`
  grid-area: star-render;
  display:flex;
  justify-content: flex-start;
  text-align: left;
  padding: 5px;
  margin: 5px;
  `;
  const UserInfo = styled.div`
  font-size: 12px;
  font-color: grey;
  grid-area: user-date;
  text-align: right;
  padding: 5px;
  margin: 5px;
  `;

;

const Body = styled.div`
grid-area: review-body;
display: grid;
margin: 5px;
border-bottom: solid black 2px;
grid-template-rows: .2fr .2fr .2fr .2fr .2f ;
grid-template-columns: .75fr .25fr;
grid-template-areas:
"item-summary item-summary"
"item-body item-photos"
"item-recommend item-photos"
"item-response item-photos"
"review-footer review-footer";
`

  const RevTitle = styled.h3`
  grid-area: item-summary;
  text-align: left;
  padding: 5px;
  margin: 5px;
  `;
  const RevBod = styled.div`
  grid-area: item-body;
  text-align: left;
  padding: 5px;
  margin: 5px;
  `;
  const RevRec = styled.p`
  font-size: 14px;
  grid-area: item-recommend;
  text-align: left;
  padding: 5px;
  margin: 5px;
  `;
  const RevPhoto = styled.img`
  grid-area: item-photos;
  padding: 10px;
  margin: 5px;
  max-height: 50px;

  `;
  const RFooter = styled.div`
  grid-area: review-footer;
  text-align: left;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  font-size: 12px;
  `;

  const RevRes = styled.div`
  grid-area: item-response;
  text-align: left;
  padding: 5px;
  margin: 5px;
  `

;
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}



export default function ReviewItem({ review, renderedProduct, rating }) {

  return (
    review.display ?
    <ReviewItemContainer>
      <StarItem>
        <StarHandler renderedProduct={renderedProduct.id} single={rating} />
      </StarItem>
      <UserInfo>
          {review.reviewer_name} | {formatDate(review.date)}
      </UserInfo>
      <Body>
        <RevTitle>
            {review.summary}
        </RevTitle>
        <RevBod>
            {review.body}
        </RevBod>
        <RevRec>
          {review.recommend ? `${'\u2714'} I would recommend this product` : ` ${'\u2716'} I would not recommend this product.`}
        </RevRec>
          {review.response ? <RevRes><h5>Response:</h5>
          {review.response} </RevRes>: <div></div>}
            {review.photos.length > 0 ? review.photos.map((photo) =>
              // <RevPhoto src={photo.url} alt="reviewPhoto" />
              <div></div>
            ) : <div></div>
            }
      <RFooter>
       <p>Helpful? Yes({review.helpfulness})</p>
      </RFooter>
      </Body>
    </ReviewItemContainer> : <div></div>
  );
}
