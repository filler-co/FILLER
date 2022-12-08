/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom';
 import { render, screen, fireEvent, cleanup } from '@testing-library/react';
 import Questions from "../Components/Reviews/Reviews.jsx";
 import MoreButton from '../Components/Shared/MoreButton.jsx';
 import SearchBar from '../Components/Reviews/FilterBy.jsx';

 afterEach(cleanup);

 const defaultProps = {
  actionNeed: jest.fn(),
  buttonName: "Submit" ,
};

// test props
test('button renders with correct text', () => {
  const { queryByText, rerender } = render(<MoreButton {...defaultProps} />);
  expect(queryByText("Submit")).toBeTruthy();

  rerender(<MoreButton {...defaultProps} buttonName="Go" />);
  expect(queryByText("Go")).toBeTruthy();
});

// test click event
test('calls correct function on click', () => {
  const onClick = jest.fn();
  const { getByText } = render(<MoreButton {...defaultProps} actionNeed={onClick} />)
  fireEvent.click(getByText(defaultProps.buttonName));
  expect(onClick).toHaveBeenCalled();
});