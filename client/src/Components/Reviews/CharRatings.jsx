import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';


const StyledRadioForm = styled.form`
font-size: .78em;
margin: 3px;
`

const CharTitle = styled.label`
font-size: .75rem;
font-weight: bold;
display: flex;
justify-content: center;
`


export default function CharRatings() {

  const [prodChar, setProdChar] = useState('');
  const [prodVal, setProdVal] = useState('');
  const [prodObj, setProdObj] = useState({})

  const inputClickHandler = (e) => {
    setProdVal(e.target.id);
    setProdChar(e.target.value);
    setProdObj(prodObj, prodObj[e.target.value] = e.target.id)
  }
  console.log(prodVal, prodChar, prodObj)

  const allCharacteristicInfo = [
    ['Size', ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'] ],
    ['Width', ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly Wide', 'A size too wide']],
    ['Comfort', ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']],
    ['Quality', ['Poor', 'Below average', 'What I expected', 'Pretty Great', 'Perfect']],
    ['Length', ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']],
    ['Fit', ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']],

  ]

  return (
    <>
      {allCharacteristicInfo.map((item) => {
        console.log('PO', prodObj[prodChar])
        return (<StyledRadioForm action="submit">
          {prodObj[item[0]] !== undefined && prodChar === item[0] ?
           <CharTitle>
           {item[0]}
            -{item[1][prodVal]}
           <br></br>
           </CharTitle>
          :<CharTitle>
          {item[0]}
          <br></br>
          </CharTitle> }
             <input onClick={(e) => {inputClickHandler(e)}} type="radio"  name="chars" value={item[0]} id="0"></input>
             <input onClick={(e) => {inputClickHandler(e)}} type="radio" name="chars" value={item[0]} id="1"></input>
             <input onClick={(e) => {inputClickHandler(e)}} type="radio" name="chars" value={item[0]} id="2"></input>
             <input onClick={(e) => {inputClickHandler(e)}} type="radio" name="chars" value={item[0]} id="3"></input>
             <input onClick={(e) => {inputClickHandler(e)}} type="radio" name="chars" value={item[0]} id="4"></input>
        </StyledRadioForm>)
      })}
    </>

  )

}