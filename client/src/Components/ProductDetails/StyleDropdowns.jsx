import React from 'react';
// import RelatedProducts from './RelatedProducts.jsx';
import styled from 'styled-components';

const StyleDropdownContainer = styled.div`
  display: flex;
`;

const SizeDropdownContainer = styled.div`
`;

const SizeDropdownHeader = styled.div`
`;

const SizeDropdownListContainer = styled.div`
`;

const SizeDropdownList = styled.ul`
`;

const SizeListItem = styled.li`
`;

const QtyDropdownContainer = styled.div`
`;

const QtyDropdownHeader = styled.div`
`;

const QtyDropdownListContainer = styled.div`
`;

const QtyDropdownList = styled.ul`
`;

const QtyListItem = styled.li`
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
  return (
    <StyleDropdownContainer>
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
        <QtyDropdownHeader onClick={() => setQtyOpen(!qtyOpen)}>
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
    </StyleDropdownContainer>
  )
}