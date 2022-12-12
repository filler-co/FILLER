import {React, useState} from 'react';
import styled, { css } from 'styled-components';
import StarOutline from '../Shared/starOutline.svg';


const StyledSkillBox = styled.div`
box-sizing: border-box;
width: 100;
margin: 20px 0;

`

const StyledRatingNum = styled.button`
color: #fff;
font-weight: bold;
border: none;
background: none;

`
const StyledRatingAmount = styled.p`
color: #fff;
float: right;
margin: 0 0 10px;
font-weight: bold;
position: relative;
top: 5px;
font-size: 13px;
`
const GraphBox = styled.div`
backGround: #262626;
padding: 4px;
box-sizing: border-box;
border: 1px solid #0fffb7;
border-radius: 2px;
margin-bottom: 12px;
`
const GraphLevels = styled.div`
background: #0fffb7;
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
                border: ratingFilter[item[0]] ? 'solid pink 2px' : ''
              }} >{item[0]} Star</StyledRatingNum>
              <StyledRatingAmount>{item[1]} Reviews</StyledRatingAmount>
              <GraphBox >
                <GraphLevels style={{width: `${(item[1]/ totals) * 100}%`}}></GraphLevels>
              </GraphBox>
              </div>)
      })}
    </StyledSkillBox>

  )
}