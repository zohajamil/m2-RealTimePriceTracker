import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Loading } from 'react-loading-dot'
import './coinDetail.scss'
import HistoricalBitcoinPrices from '../../components/HistoricalBitcoinPrices/HistoricalBitcoinPrices';

const CoinDetail = () => {
  const [previousPrice, setPreviousPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChangeColor, setPriceChangeColor] = useState('');

  const { coinCode } = useParams()

  useEffect(() => {
    let socket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinCode?.toLowerCase()}usdt@trade`)
    socket.onmessage = (event) => {
      let stockObj = JSON.parse(event.data)
      const newPrice = parseFloat(stockObj.p);
      setCurrentPrice(newPrice);
    }

    return () => {
      socket.close();
    };
  }, [])

  useEffect(() => {
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
        <img className="rotating-image" src={require(`../../images/${coinCode?.toLowerCase()}-tlogo.png`)} width='120px' alt="Rotating-logo" />
      </div>
      <div className="coin-data">
        {currentPrice === 0 ?
          <Loading background="#bb9830" />
          :
          (
            <>
              <h2>Current Price:&nbsp;
                <span className={`${priceChangeColor}`}> {currentPrice === 0 ? <Loading /> : `$${currentPrice.toFixed(4)}`} </span>
              </h2>
              <HistoricalBitcoinPrices />
            </>
          )}
      </div>
    </div>
  )
}

export default CoinDetail