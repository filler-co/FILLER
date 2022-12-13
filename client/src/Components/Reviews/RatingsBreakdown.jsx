import { React, useState, useEffect } from 'react';
import StarHandler from '../Shared/StarHandler.jsx';
import axios from 'axios';
import RatingsGraph from './RatingsGraph.jsx';
import styled, { css } from 'styled-components';

import token from '../../../../config';


const Bdown = styled.div`
display: grid;
grid-template-rows: .1fr .3fr .6fr;
grid-gap: .5rem;
grid-template-areas:
  "header-template"
  "stars-template"
  "breakdown-box";
`
const BHeader = styled.h3`
grid-area: header-template;
display: flex;
justify-content: center;
margin-bottom: 7px;
`

const StarStyled = styled.div`
grid-area: stars-template;
`
const Box = styled.div`
grid-area: breakdown-box;
padding: 20px;
box-sizing: border-box;

`





export default function RatingsBreakdown({ renderedProduct, reviewList, setReviewList, setFilterByRating, breakdownList, setBreakdownList,}) {
  const num = true;
  const [graphData, setGraphData] = useState([]);

  const getGraphData = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
      .then((data) => { setGraphData(Object.entries(data.data.ratings)); })
      .catch((err) => console.log(err));
  }

  useEffect(() => { if (renderedProduct.id) { getGraphData() } }, [renderedProduct]);








  return (
      <Bdown>
        <BHeader>Review Breakdown</BHeader>
        <StarStyled>
        {renderedProduct.id ? <StarHandler renderedProduct={renderedProduct.id} num={num} single={false} /> : <div></div>}
        </StarStyled>
        <Box>
        <RatingsGraph reviewList={reviewList} graphData={graphData} setReviewList={setReviewList} setFilterByRating={setFilterByRating} breakdownList={breakdownList} setBreakdownList={setBreakdownList}/>
        </Box>
      </Bdown>


  );
}
