import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts'
import dayjs from "dayjs";
import { useParams } from 'react-router-dom';
import './historicalCoinPrices.scss';
import { getCoinNameFromCode } from '../../common/utils';
import { darkPrimaryColor } from '../../common/constants';

const HistoricalBitcoinPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { coinCode } = useParams();

  const fetchBitcoinPrices = async () => {
    try {
      // Setting dates such that the start date is 3 days before the current (end) date
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 3);

      const endDateTimestamp = endDate.getTime();
      const startDateTimestamp = startDate.getTime();

      // Change this value if shorter intervals are required in the data
      const interval = '30m'

      const response = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${coinCode?.toUpperCase()}USDT&interval=${interval}&startTime=${startDateTimestamp}&endTime=${endDateTimestamp}`
      );

      // Response data format: [timestamp, open, high, low, close, ...]
      const formattedPrices = response.data.map((item: string[]) => ({
        x: dayjs(item[0]).format("DD/MM/YYYY HH:mm"),
        y: [parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4])]
      }));

      setPrices(formattedPrices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Bitcoin prices:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prices.length === 0) {
      fetchBitcoinPrices();
    }
  }, []);

  useEffect(() => {
    // Display chart only when the prices object is initialized
    if (prices.length) {
      var element = document.querySelector("#chart")
      var options = {
        chart: {
          type: 'candlestick'
        },
        series: [{
          data: prices
        }],
        plotOptions: {
          candlestick: {
            colors: {
              upward: darkPrimaryColor,
              downward: '#000'
            },
            wick: {
              useFillColor: true
            }
          }
        }
      }
      var chart = new ApexCharts(element, options);
      if (element) {
        chart.render()
      }
    }
  }, [prices])


  return (
    <div className="historical-bitcoin-prices-container">
      <h2>Historical {getCoinNameFromCode(coinCode ?? '')} Prices Data Over the Past 3 Days</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div data-testid="chart" id="chart"></div>
      )}
    </div>
  );
};

export default HistoricalBitcoinPrices;
