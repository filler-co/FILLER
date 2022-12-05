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




export default function StyleDropdowns ({selectedStyle}) {
  const [sizeOpen, setSizeOpen] = React.useState(false);
  const [sizeOption, setSizeOption] = React.useState('Select Size');
  const [sizeList, setSizeList] = React.useState([]);

  React.useEffect(() => {
    if (selectedStyle && selectedStyle.skus) {
      setSizeList(Object.keys(selectedStyle.skus)
      .filter((sizeId) => selectedStyle.skus[sizeId].quantity>0)
      .map((sizeId) => {return {sizeId: sizeId, quantity: selectedStyle.skus[sizeId].quantity, size: selectedStyle.skus[sizeId].size}}))
      setSizeOption('Select Size');
    }
  },  [selectedStyle])
  return (
    <StyleDropdownContainer>
      <SizeDropdownContainer>
        <SizeDropdownHeader onClick={() => setSizeOpen(!sizeOpen)} >
          {sizeOption}
        </SizeDropdownHeader>
        {sizeOpen && (
          <SizeDropdownListContainer>
          <SizeDropdownList>
            {sizeList.map((sizeObj) => <SizeListItem key={sizeObj.sizeId} onClick={() => {setSizeOption(sizeObj.size); setSizeOpen(!sizeOpen);}}>{sizeObj.size}</SizeListItem>)}
          </SizeDropdownList>
        </SizeDropdownListContainer>
        )}

      </SizeDropdownContainer>
    </StyleDropdownContainer>
  )
}