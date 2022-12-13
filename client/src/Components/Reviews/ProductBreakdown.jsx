import {React, useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import token from '../../../../config';
import UpArrow from './upArrow.svg';



const GraphBox = styled.div`
background: grey;
padding: 3px;
box-sizing: border-box;
border: 1px solid black;
height: 10px;
border-radius: 10px;
margin-bottom: 0px;
`

const CharBox = styled.div `
padding: 20px;
box-sizing: border-box;
box-shadow: 0 20px 50px rgba(0,0,0,.5);
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
      <h3 style={{"marginBottom": "10px", "display": "flex", "justifyContent": "center"}}>Product Characteristics</h3>
    <CharBox style={{"maxHeight": "50vh"}}>
       { pBList.map((item, idx) => {
     return (<div key={idx} style={{display: "flex", "flexDirection": "column", "justifyContent": "space-between", "border": "none", "margin": "7px", "padding": "2%", "borderRadius": "5px"}}>
      <div>
      <p style={{"fontWeight": "bold", "display": "flex", "justifyContent": "center", "fontSize": "larger"}}>{item[0]}</p>
      </div>
      <GraphBox >
        <UpArrow style={{height: "20px", width: "20px", "marginLeft": `${item[1].value.slice(0,2)*10}%`, "marginTop": "-8.5px"}} />
      </GraphBox>
      <div>
        <p style={{float: "left", "marginTop": "0px", "fontSize": "medium"}}>1</p>
        <p style={{float: "right", "marginTop": "0px", "fontSize": "medium"}}>5</p>
      </div>
      </div>)
       })}


    </CharBox>
    </>
  )
}