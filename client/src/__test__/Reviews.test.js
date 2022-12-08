/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom';
 import { render, screen, fireEvent, cleanup } from '@testing-library/react';
 import Reviews from "../Components/Reviews/Reviews.jsx";
 import MoreButton from '../Components/Shared/MoreButton.jsx';
 import FilterBy from '../Components/Reviews/FilterBy.jsx';

 afterEach(cleanup);

 const defaultProps = {
  actionNeed: jest.fn(),
  buttonName: "Submit" ,
};

// test props (from Questions)
test('button renders with correct text', () => {
  const { queryByText, rerender } = render(<MoreButton {...defaultProps} />);
  expect(queryByText("Submit")).toBeTruthy();

  rerender(<MoreButton {...defaultProps} buttonName="Go" />);
  expect(queryByText("Go")).toBeTruthy();
});

// test click event (from Questions)
test('calls correct function on click', () => {
  const onClick = jest.fn();
  const { getByText } = render(<MoreButton {...defaultProps} actionNeed={onClick} />)
  fireEvent.click(getByText(defaultProps.buttonName));
  expect(onClick).toHaveBeenCalled();
});

it('Review module renders', async () => {
  render(<Reviews renderedProduct={{name: 'test1'}} />);
  const productElement = screen.getByText(/Ratings & Reviews/i);
  expect(productElement).toBeInTheDocument();
 })