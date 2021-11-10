import { render, screen } from '@testing-library/react';
import App from './App';

describe("first render",() => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('renders some text',() => {
    render(<App />);
    const getText = screen.getByText(/Edit/i)
    expect(getText).toBeInTheDocument();
  })
})
