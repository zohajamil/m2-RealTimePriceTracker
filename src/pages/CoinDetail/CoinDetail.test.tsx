import { render, screen, waitFor } from '@testing-library/react';
import CoinDetail from './CoinDetail';

// Mock react-router-dom and mock useParams to return a coinCode
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ coinCode: 'BTC' }), 
}));

describe('CoinDetail component', () => {
  it('should update currentPrice when receiving WebSocket message', async () => {
    // Mock websocket (add used functions so there is no error)
    const mockWebSocketInstance : any = {
      onmessage: null,
      close: jest.fn(),
    };

    global.WebSocket = jest.fn().mockImplementation(() => mockWebSocketInstance) as any;

    render(<CoinDetail />);

    // Simulate a WebSocket message
    const mockPriceData = { p: '50000' };
    mockWebSocketInstance.onmessage({ data: JSON.stringify(mockPriceData) });

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByText('$50000.00000')).toBeInTheDocument(); // Check if the updated value is correct as returned by the mockWebSocketInstance (Added 5 zeros as its fixed to 5 dps)
    });
  });
});
