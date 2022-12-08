/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Questions from "../Components/Questions/Questions.jsx";
import MoreButton from '../Components/Shared/MoreButton.jsx';
import SearchBar from '../Components/Questions/SearchBar.jsx';


/***
 * Test plan
 *      1) SearchBar : presence, onChange event, filter effect, clear icon
 *      2) Questions component: 2 questions & 2 answers by default
 *      3) Loadmore answers link: presence, onClick event
 *      4) Helpful voter: presence, onClick event
 *      5) MoreButton: presence, onClick event
 * ***/

afterEach(cleanup);

/*
*  Test moreButton : presence, props, clickEvent
*/
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



/*
*  Test searchBar component : presence, onChange event
*/

// test presence
test('should show the right placeholder', async() => {
  render(<SearchBar searchQuestion={jest.fn()}/>);
  const inputElement = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
  expect(inputElement).toBeInTheDocument();
});

// test onchange event
test('displays the correct search term', () => {
  render(<SearchBar searchQuestion={jest.fn()}/>);
  const inputElement = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
  expect(inputElement.value).toBe("");
  fireEvent.change(inputElement, { target: { value: "waterproof" }});
  expect(inputElement.value).toBe("waterproof");
});


/*
** Test general display
*/











