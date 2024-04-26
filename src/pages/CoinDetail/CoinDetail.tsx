import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Loading } from 'react-loading-dot'
import './coinDetail.scss'
import HistoricalBitcoinPrices from '../../components/HistoricalCoinPrices/HistoricalCoinPrices';
import { darkPrimaryColor } from '../../common/constants';

const CoinDetail = () => {
  const [previousPrice, setPreviousPrice] = useState(0); // Maintaining previousPrice so that we can compare and change color of the currentPrice accordingly
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChangeColor, setPriceChangeColor] = useState(''); // Color of currentPrice added as state so that its chnges causes rerender and thus change in the color

  const { coinCode } = useParams()

  useEffect(() => {
    // Opening socket connection
    let socket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinCode?.toLowerCase()}usdt@trade`)
    socket.onmessage = (event) => {
      let stockObj = JSON.parse(event.data)
      const newPrice = parseFloat(stockObj.p); // p is the price of the coin
      setCurrentPrice(newPrice);
    }

    return () => {
      // Close socket connection when the details page is unmounted/closed
      socket.close();
    };
  }, [coinCode])

  useEffect(() => {
    // Set the color of the currentPrice by comparing it with the previousPrice
    if (currentPrice !== 0 && previousPrice !== 0) {
      setPreviousPrice(currentPrice);

      if (currentPrice > previousPrice) {
        setPriceChangeColor('price-increase');
      } else if (currentPrice < previousPrice) {
        setPriceChangeColor('price-decrease');
      }
    } else if (currentPrice !== 0 && previousPrice === 0) {
      setPreviousPrice(currentPrice);
    }
  }, [currentPrice, previousPrice]);


  return (
    <div className="coin-detail-container">
      <div className="align-right">
        {/* Have named the transparent logos with the same format i.e. coinCode-tlogo.png */}
        <img className="rotating-image" src={require(`../../images/${coinCode?.toLowerCase()}-tlogo.png`)} width='120px' alt="Rotating-logo" />
      </div>
      <div className="coin-data">
        {/* Show 3 dots loading on the whole page when the currentData is not fetched yet */}
        {currentPrice === 0 ?
          <Loading background={darkPrimaryColor} />
          :
          (
            <>
            {/* Display the current price fixed to 5 decimal places */}
              <h2>Current Price:&nbsp;
                <span className={`${priceChangeColor}`}> {`$${currentPrice.toFixed(5)}`} </span>
              </h2>
              <HistoricalBitcoinPrices />
            </>
          )}
      </div>
    </div>
  )
}

export default CoinDetail