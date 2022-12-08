/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom';
 import { render, screen, fireEvent } from '@testing-library/react';
 import StylePrice from '../Components/ProductDetails/StylePrice.jsx';
 import ProductDetails from '../Components/ProductDetails/ProductDetails.jsx';
 import StyleDropdowns from '../Components/ProductDetails/StyleDropdowns.jsx';

 var dropdownObj= {skus: {
  "1394769": {
      "quantity": 8,
      "size": "XS"
  },
  "1394770": {
      "quantity": 16,
      "size": "S"
  },
  "1394771": {
      "quantity": 17,
      "size": "M"
  },
  "1394772": {
      "quantity": 10,
      "size": "L"
  },
  "1394773": {
      "quantity": 15,
      "size": "XL"
  },
  "1394774": {
      "quantity": 4,
      "size": "XL"
  }
}}

it('first test -- check for product name', async () => {
  render(<ProductDetails renderedProduct={{name: 'test1'}} />);
  const productElement = screen.getByText(/PRODUCT NAME/i);
  expect(productElement).toBeInTheDocument();
 })

 it('should render style price', async () => {
  render(<StylePrice selectedStyle={{original_price: 140}}/>);
  const priceElement = await screen.getByText(/140/);
  expect(priceElement).toBeInTheDocument();
 })

 it('size dropdown should show sizes on click', async () => {
  render(<StyleDropdowns selectedStyle={dropdownObj} />);
  fireEvent.click(screen.getByText(/Select Size/));
  const sizeElement = await screen.getByText(/XS/);
  expect(sizeElement).toBeInTheDocument();
 })

