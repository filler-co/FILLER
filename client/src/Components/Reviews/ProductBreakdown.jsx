import {React, useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import token from '../../../../config';


const StyledBar = styled.div`
background: grey;
border-radius: 2px;
height: 6px;
margin-top: 25px;

`

const Circle = styled.div`
background: green;
height: 15px;
margin-left: 30%;
width: 5px;


`



const StyledSkillBox = styled.div`
box-sizing: border-box;
width: 100;
margin: 20px 0;

`

const GraphBox = styled.div`
backGround: grey;
padding: 3px;
box-sizing: border-box;
border: 1px solid #black;
border-radius: 10px;
margin-bottom: 12px;
`




export default function ProductBreakdown({renderedProduct}) {

  const [pBList, setPBList] = useState([]);


  const reviewFilter = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
    .then((data) => { setPBList(...pBList, data.data.characteristics)})
    .catch((err) => console.log(err));
  }

  useEffect(() => {if(renderedProduct.id){reviewFilter()}}, [renderedProduct.id])


  console.log(pBList)




  return(
    <div>
      <h3>PRODUCT BREAKDOWN</h3>
      <p >Sizing</p>
      <GraphBox>
        <Circle />
        <p style={{float: "left"}}>1</p>
        <p style={{float: "right"}}>5</p>
      </GraphBox>

    </div>
  )
}