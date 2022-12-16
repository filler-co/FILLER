import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import BlackStar from '../Shared/blackStar.svg';
import StarOutline from '../Shared/starOutline.svg';


export default function OverallStarRating() {


 const starSelector = (e) => {
  starOutline[e.target.id] = <BlackStar id={e.target.id} height="20px" width="20px"/>
 }

 let starOutline = [];
 let i = 0;
 while (starOutline.length < 5) {
  starOutline.push(<StarOutline  onClick={starSelector} id={i} height="20px" width="20px"/>)
  i++;
 }



  return (
    <div>
      <h5>Overall Rating</h5>
      <div style={{"display" : "flex", "flex-direction" : "row"}}>
        {starOutline}
      </div>
    </div>



  )
}