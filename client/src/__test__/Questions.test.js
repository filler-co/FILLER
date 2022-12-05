/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Questions from "../Components/Questions/Questions.jsx";
import MoreButton from '../Components/Shared/MoreButton.jsx';
import SearchBar from '../Components/Questions/SearchBar.jsx';

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", { name: /Add/i} );
  tasks.forEach((task) => {
      fireEvent.change(inputElement, { target: { value: task } });
      fireEvent.click(buttonElement);
  })
}

it('should render Q&A text', async () => {
  render(<Questions />);
  const textElement = screen.getByText(/Q&A/i);
  expect(textElement).toBeInTheDocument();
});

it('should render the right button name', async() => {
  render(<MoreButton buttonName='MORE ANSWERED QUESTIONS'/>);
  const buttonElement = screen.getByText('MORE ANSWERED QUESTIONS');
  expect(buttonElement).toBeInTheDocument();
});

it('should show the right placeholder', async() => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
  expect(inputElement).toBeInTheDocument();
});







