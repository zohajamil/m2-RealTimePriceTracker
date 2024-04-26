import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { coinData } from '../../common/CoinData';
import { BrowserRouter } from 'react-router-dom';

describe('Home component', () => {
  it('should render CoinCard for all coins in coinData', () => {
    // Wrapped BrowserRouter to remove the error for useNavigate
    render(<BrowserRouter><Home /></BrowserRouter>);
    
    // Get CoinCard elements rendered by the Home component
    const coinCards = screen.queryAllByTestId('coin-card');
    
    // Check if the number of rendered CoinCard elements matches the length of coinData
    expect(coinCards.length).toBe(coinData.length);
  });
});
