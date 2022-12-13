import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as hollowHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

const StyleContainer = styled.div`
  display: grid;
  grid-template-rows: 75%, 50%;
  z-index: 1;
  width: 100%;
  height: 8vw;
  justify-content: start;
`;

const RowAGrid = styled.div`
width: 100%;
grid-row: 1;
display: flex;
justify-content: space-between;
margin-bottom: 40px;
height: 38px;
`;

const RowBGrid = styled.div`
grid-row: 2;
display: flex;
`;
const SizeDropdownContainer = styled.div`

  text-align: center;
  z-index: 2;
  width: 23vw;
  margin-right: 10px;
`;

const SizeDropdownHeader = styled.div`
  z-index: 5;
  width: 100%;
  height: 44px;
  font-weight: bold;
  font-size: 0.85rem;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover{
    border: 1px solid #6cccdd;
  }
`;

const SizeDropdownListContainer = styled.div`
  z-index: 5;
  overflow-y: scroll;
  overflow-x: hidden;
  background: white;
  max-height: 20vh;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  position: absolute;
  width: inherit;
`;

const SizeDropdownList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SizeListItem = styled.li`
  cursor: pointer;
  font-weight: 200;
  &:hover{
    background: #6cccdd;
    color: white;
  }
`;

const QtyDropdownContainer = styled.div`

  text-align: center;
  z-index: 2;
  width: 10vw;
`;

const QtyDropdownHeader = styled.div`
  z-index: 5;
  height: 44px;
  font-weight: 500;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover{
    border: 1px solid #6cccdd;
  }
`;

const QtyDropdownListContainer = styled.div`
  z-index: 5;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 20vh;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  background: white;
  position: absolute;
  width: inherit;
`;

const QtyDropdownList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const QtyListItem = styled.li`
  cursor: pointer;
  font-weight: 200;
  &:hover{
    background: #6cccdd;
    color: white;
  }
`;

const AddCartContainer = styled.div`
  text-align: center;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 52px;
  margin-right: 10px;

`;

const AddCartButton = styled.button`
  cursor: pointer;
  background: none;
  font-weight: 700;
  height: 52px;
  background: black;
  width: 100%;
  border: 1px solid black;
  color: white;


  &:hover{
    background: #6cccdd;
    border: 1px solid #6cccdd;
  }

`;

const FavContainer = styled.div`
  text-align: center;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 52px;
`;

const FavButton =styled.button`
  cursor: pointer;
  background: none;
  border: 1px solid black;
  height: 52px;
  width: 52px;
  color: #black;



  &:hover{
    background: #6cccdd;
    border: 1px solid #6cccdd;
    color: white;
  }

`;



export default function StyleDropdowns ({selectedStyle, favoritesInfo, updateFavorites}) {
  const [sizeOpen, setSizeOpen] = React.useState(false);
  const [sizeOption, setSizeOption] = React.useState('SELECT SIZE');
  const [sizeList, setSizeList] = React.useState([]);
  const [qtyOpen, setQtyOpen] = React.useState(false);
  const [QtyOption, setQtyOption] = React.useState('-');
  const [qtyList, setQtyList] = React.useState([]);
  const [favorite, setFavorite] = React.useState(false);

  React.useEffect(() => {
    if (selectedStyle && selectedStyle.skus) {
      setSizeList(Object.keys(selectedStyle.skus)
      .filter((sizeId) => selectedStyle.skus[sizeId].quantity>0)
      .map((sizeId) => {return {sizeId: sizeId, quantity: selectedStyle.skus[sizeId].quantity, size: selectedStyle.skus[sizeId].size}}))
      setSizeOption('SELECT SIZE');
      setSizeOpen(false);
      setQtyOption('-');
      setQtyOpen(false);
      setQtyList([]);
      if (favoritesInfo) {
        if (favoritesInfo[selectedStyle.style_id]) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    }
  },  [selectedStyle])

  const loadQty = (quantity) => {
    var list = [];
    for (var i = 1; i <= quantity; i++) {
      list.push(i.toString());
      if (i === 15) {
        break;
      }
    }
    setQtyList(list);
  }

  const addCartSubmit = (e) => {
    // console.log('added to cart');
    if (sizeOption.length > 2) {
      setSizeOpen(true);
      setSizeOption('PLEASE SELECT SIZE');
    }
  }
  return (
    <StyleContainer>
      <RowAGrid>
        <SizeDropdownContainer>
          <SizeDropdownHeader onClick={() => setSizeOpen(!sizeOpen)} >
            {sizeOption}
          </SizeDropdownHeader>
          {sizeOpen && (
            <SizeDropdownListContainer>
            <SizeDropdownList>
              {sizeList.map((sizeObj) => <SizeListItem key={sizeObj.sizeId} onClick={() => {setSizeOption(sizeObj.size); setSizeOpen(!sizeOpen); loadQty(sizeObj.quantity); setQtyOption('1')}}>{sizeObj.size}</SizeListItem>)}
            </SizeDropdownList>
          </SizeDropdownListContainer>
          )}

        </SizeDropdownContainer>
        <QtyDropdownContainer>
          <QtyDropdownHeader onClick={() => { if(qtyList.length > 0) {setQtyOpen(!qtyOpen)} }}>
            {QtyOption}
          </QtyDropdownHeader>
          {qtyOpen && (
            <QtyDropdownListContainer>
              <QtyDropdownList>
                {qtyList.map((qty) => <QtyListItem key={qty} onClick={() => {setQtyOption(qty); setQtyOpen(!qtyOpen) }}>{qty}</QtyListItem>)}
              </QtyDropdownList>
            </QtyDropdownListContainer>
          )}

        </QtyDropdownContainer>

      </RowAGrid>
      <RowBGrid>
        <AddCartContainer>
          <AddCartButton type="submit" onClick={() => addCartSubmit()}>ADD TO CART</AddCartButton>
        </AddCartContainer>
        <FavContainer>
          <FavButton onClick={() => {updateFavorites(selectedStyle.style_id); setFavorite(!favorite)}}>{favorite?(<FontAwesomeIcon icon={faHeart} />):(<FontAwesomeIcon icon={hollowHeart} />)}</FavButton>
        </FavContainer>
      </RowBGrid>


    </StyleContainer>
  )
}
