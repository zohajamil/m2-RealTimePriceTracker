import { render, screen, waitFor } from '@testing-library/react';
import CoinDetail from './CoinDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ coinCode: 'BTC' }), // Mock useParams to return a coinCode
}));

describe('Web Socket API is working & correct data is being displayed', () => {
  it('should update currentPrice when receiving WebSocket message', async () => {
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
      expect(screen.getByText('$50000.0000')).toBeInTheDocument();
    });
  });
});
