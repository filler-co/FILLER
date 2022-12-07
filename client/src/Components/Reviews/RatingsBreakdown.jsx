import {React, useState, useEffect} from 'react';
import StarHandler from '../Shared/StarHandler.jsx';
import axios from'axios';

import token from '../../../../config';

export default function RatingsBreakdown({ renderedProduct }) {
  const num = true;
  const [graphData, setGraphData] = useState([]);

  const getGraphData = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
      .then((data) => { setGraphData(Object.entries(data.data.ratings)); })
      .catch((err) => console.log(err));
  }

  useEffect(() => {if(renderedProduct) {getGraphData()}}, [renderedProduct]);

  console.log('cr', graphData)



  return (
    <div>
    <h3>REVIEW BREAKDOWN</h3>
    {renderedProduct.id ? <StarHandler renderedProduct={renderedProduct.id} num={num} single={false}/> : <div></div> }
    </div>

  );
}
