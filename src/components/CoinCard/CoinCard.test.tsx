import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CoinCard from './CoinCard';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CoinCard component', () => {
  it('should redirect user to the correct URL when clicked', () => {
    // Mock the navigate function
    const mockNavigate = jest.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    // Initialized coin data to pass as props
    const coin = {
      code: 'BTC',
      name: 'Bitcoin',
      iconUrl: 'btc-logo.png',
    };

    render(<CoinCard coin={coin} />);

    // Simulate a click on the card by getting it with img
    fireEvent.click(screen.getByRole('img'));

    // Verify that the navigate function is called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith(`/price-tracker/${coin.code}`);
  });
});
