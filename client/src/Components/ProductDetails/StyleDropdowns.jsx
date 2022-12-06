import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

const StyleContainer = styled.div`
  display: grid;
  grid-template-columns: 50%, 50%;
  grid-template-areas:
    "size-dropdown qty-dropdown";
  z-index: 1;
`;

const SizeDropdownContainer = styled.div`
  grid-area: size-dropdown;
  text-align: center;
  z-index: 2;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin: 5px 5px 0px 5px;
  margin-bottom: 25%;
`;

const SizeDropdownHeader = styled.div`
  z-index: 5;
`;

const SizeDropdownListContainer = styled.div`
  z-index: 5;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 70%;
`;

const SizeDropdownList = styled.ul`
`;

const SizeListItem = styled.li`
`;

const QtyDropdownContainer = styled.div`
  grid-area: qty-dropdown;
  text-align: center;
  z-index: 1;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
`;

const QtyDropdownHeader = styled.div`
  z-index: 3;
`;

const QtyDropdownListContainer = styled.div`
  z-index: 3;
`;

const QtyDropdownList = styled.ul`
`;

const QtyListItem = styled.li`
`;

const AddCartContainer = styled.div`
  grid-area: size-dropdown;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin: 0px 5px 5px 5px;
  margin-top: 25%;
  text-align: center;
  z-index: 1;
`;

const AddCartButton = styled.button`
  cursor: pointer;

`;

const FavContainer = styled.div`
  grid-area: qty-dropdown;
  border: solid 1px cornflowerblue;
  padding: 5px;
  margin:5px;
  padding-top: 25%;
  text-align: center;
`;




export default function StyleDropdowns ({selectedStyle}) {
  const [sizeOpen, setSizeOpen] = React.useState(false);
  const [sizeOption, setSizeOption] = React.useState('Select Size');
  const [sizeList, setSizeList] = React.useState([]);
  const [qtyOpen, setQtyOpen] = React.useState(false);
  const [QtyOption, setQtyOption] = React.useState('-');
  const [qtyList, setQtyList] = React.useState([]);

  React.useEffect(() => {
    if (selectedStyle && selectedStyle.skus) {
      setSizeList(Object.keys(selectedStyle.skus)
      .filter((sizeId) => selectedStyle.skus[sizeId].quantity>0)
      .map((sizeId) => {return {sizeId: sizeId, quantity: selectedStyle.skus[sizeId].quantity, size: selectedStyle.skus[sizeId].size}}))
      setSizeOption('Select Size');
      setSizeOpen(false);
      setQtyOption('-');
      setQtyOpen(false);
      setQtyList([]);
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
      setSizeOption('Please Select Size');
    }
  }
  return (
    <StyleContainer>
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
      <AddCartContainer>
        <AddCartButton type="submit" onClick={() => addCartSubmit()}>Add to Cart</AddCartButton>
      </AddCartContainer>
      <FavContainer>
        FAV BUTTON
      </FavContainer>
    </StyleContainer>
  )
}