import {React, useState} from 'react';
import styled, { css } from 'styled-components';
import StarOutline from '../Shared/starOutline.svg';


const StyledSkillBox = styled.div`
box-sizing: border-box;
width: 100;
margin: 20px 0;

`

const StyledRatingNum = styled.button`
color: ${(props) => props.theme.bg === 'white' ? 'black' : 'white'};
background: none;
border: none;
border-radius: 5px;
font-size: 0.8em;
cursor:pointer;
&:hover {
  background-color: grey;


`
const StyledRatingAmount = styled.p`
color: ${(props) => props.theme.font};
float: right;
margin: 0 0 10px;
position: relative;
top: 5px;
font-size: 13px;
`
const GraphBox = styled.div`
backGround: lightgrey;
box-sizing: border-box;
border-radius: 2px;
margin-bottom: 12px;
`
const GraphLevels = styled.div`
background: #04AA6D;
height: 10px;

`






export default function RatingsGraph({graphData, reviewList, setReviewList, filterByRating, setFilterByRating, breakdownList, setBreakdownList}) {

  const [ratingFilter, setRatingFilter] = useState(
    {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    }
  );
  const arr = []

  const clickHandler = (e) => {
    setFilterByRating(true)
    setBreakdownList(breakdownList.splice(0, breakdownList.length))
    console.log(e.target.value)
    ratingFilter[e.target.value] = !ratingFilter[e.target.value]

    console.log('bdl',breakdownList)

    reviewList.forEach((item) => {

      if (ratingFilter[item.rating] === true ) {
        console.log('here')
        breakdownList.push(item)
      }
    })

    setBreakdownList([...breakdownList])


    if(!Object.values(ratingFilter).includes(true)) {

      setFilterByRating(false)
    }




  }


  let totals = 0;
  graphData.forEach((item) => {
    totals += Number(item[1]);
  })

  return (
    <StyledSkillBox>
     {graphData.map((item, idx) => {
            return (<div key={idx}>
              <StyledRatingNum value={item[0]} onClick={(e) => {clickHandler(e)}} style={{
                border: ratingFilter[item[0]] ? '1px solid black' : ''
              }} >{item[0]} Stars</StyledRatingNum>
              <StyledRatingAmount>{item[1]} Reviews</StyledRatingAmount>
              <GraphBox >
                <GraphLevels style={{width: `${(item[1]/ totals) * 100}%`}}></GraphLevels>
              </GraphBox>
              </div>)
      })}
    </StyledSkillBox>

  )
}