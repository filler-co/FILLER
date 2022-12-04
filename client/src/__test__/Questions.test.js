/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Questions from "../Components/Questions/Questions.jsx";

test('render Q&A text', async () => {
  render(<Questions />);
  const textElement = screen.getByText(/Q&A/i);
  expect(textElement).toBeInTheDocument();
});


