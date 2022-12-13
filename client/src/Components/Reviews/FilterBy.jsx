import {react, useState, useEffect} from 'react';
import token from '../../../../config';
import FilterSelector from './FilterSelector.jsx'
import axios from 'axios';


export default function FilterBy({renderedProduct, reviewList, sortState, setSortState, filterList, setFilterList, filterByRating, setFilterByRating, setTotalRevs}) {


  const reviewFilter = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${renderedProduct.id}`, { headers: { Authorization: token.TOKEN } })
    .then((data) => { setFilterList(Object.values(data.data.ratings)); })
    .catch((err) => console.log(err));
  }

  useEffect(() => {if(renderedProduct.id ){reviewFilter()}}, [renderedProduct.id])

  let total = filterList.reduce((total, num) => {return total + Math.round(num)}, 0);






  return (
  filterList.length ? <div>{total} reviews, sorted by <FilterSelector sortState={sortState} setSortState={setSortState} filterByRating={filterByRating} setFilterByRating={setFilterByRating}/></div> : <div></div>
  )

}