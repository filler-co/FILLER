import {React, useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import token from '../../../../config';
import UpArrow from './upArrow.svg';



const GraphBox = styled.div`
padding: 3px;
box-sizing: border-box;
border: 1px solid black;
height: 7.5px;
max-height: 50vh;
margin-bottom: 0px;
`

const CharBox = styled.div `
padding: 5px;
`





export default function ProductBreakdown({renderedProduct}) {

  const [pBList, setPBList] = useState([]);


  const getBreakdownData = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
    .then((data) => { setPBList(Object.entries(data.data.characteristics))})
    .catch((err) => console.log(err));
  }

  useEffect(() => {if(renderedProduct.id){getBreakdownData()}}, [renderedProduct.id])







  return(
    <>
      <h3 style={{"marginBottom": "10px", "display": "flex", "justifyContent": "center", "borderBottom": "solid black .75px"}}>Product Characteristics</h3>
    <CharBox style={{"maxHeight": "50vh", }}>
       { pBList.map((item, idx) => {
     return (<div key={idx} style={{display: "flex", "flexDirection": "column", "justifyContent": "space-between", "border": "none", "margin": "0px", "padding": "0px", "borderRadius": "5px"}}>
      <div  >
      <p style={{"display": "flex", "justifyContent": "center", "fontSize": "1rem"}}>{item[0]}</p>
      </div>
      <GraphBox >
        <UpArrow style={{height: "16px", width: "20px", "marginLeft": `${item[1].value.slice(0,2)*10}%`, "marginTop": "-8.2px"}} />
      </GraphBox>
      <div >
        <p style={{float: "left", "marginTop": "0px", "fontSize": "0.78rem", "marginLeft": "6.5px"}}>1</p>
        <p style={{float: "right", "marginTop": "0px", "marginRight": "6.5px", "fontSize": "0.78rem"}}>5</p>
      </div>
      </div>)
       })}


    </CharBox>
    </>
  )
}