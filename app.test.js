import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App, productsData } from './app';

// Mock React and ReactDOM since we are not in a browser environment
// and we don't have the CDNs available.
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('App', () => {
  const setState = jest.fn();
  const useStateMock = (initState) => [initState, setState];

  beforeEach(() => {
    // Reset the mock before each test
    setState.mockClear();
    // Mock useState to return a state and a setter function
    React.useState.mockImplementation(useStateMock);
  });

  test('should add sneakers to the cart when "Add to Cart" is clicked', () => {
    // Arrange
    const { rerender } = render(<App />);
    const sneakers = productsData.find(p => p.name === 'Sneakers');
    const addToCartButton = screen.getAllByText('Add to Cart')[2]; // Assuming sneakers is the 3rd item

    // Act
    fireEvent.click(addToCartButton);

    // Assert
    expect(setState).toHaveBeenCalledWith([sneakers]);

    // To further verify, we can check if the cart count updates
    // We need to re-render the component with the new state
    React.useState.mockImplementation(() => [[sneakers], setState]);
    rerender(<App />);
    expect(screen.getByText('Cart: 1')).toBeInTheDocument();
  });
});
