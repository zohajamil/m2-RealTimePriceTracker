/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; // Import axios for mocking
import HistoricalBitcoinPrices from './HistoricalCoinPrices';

// Mock axios
jest.mock('axios');

// mock resize observer
class ResizeObserver {
    observe() { }
    unobserve() { }
}

describe('chart is displayed and it shows correct data', () => {
    (window as any).ResizeObserver = ResizeObserver;
    it('should render the chart with historical Bitcoin prices', async () => {
        // Mock response data
        const mockData = [
            [1619623200000, '60000', '62000', '59000', '61000'],
            [1619626800000, '61000', '63000', '60000', '62000'],
        ];

        // Mock axios.get to return a promise with mockData
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

        render(<HistoricalBitcoinPrices />);

        // Wait for the chart to render
        await waitFor(() => {
            // Check if the chart element is rendered
            const chartElement = screen.getByTestId('chart');
            expect(chartElement).toBeInTheDocument();

            // Check if the chart rendered with the expected data
            expect(chartElement).toHaveTextContent('60000'); 
        });
    });
});
