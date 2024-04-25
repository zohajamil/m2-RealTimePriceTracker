import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box/Box';
import './App.scss';
import Home from './pages/Home/Home';
import CoinDetail from './pages/CoinDetail/CoinDetail';
import AppHeader from './components/AppHeader/AppHeader';
import { useEffect, useState } from 'react';

function App() {

  // const [stockPrice, setStockPrice] = useState<number>(0)


  // useEffect(() => {
  //   const alpaca = 'wss://stream.data.alpaca.markets/v1beta3/crypto/us'
  //   const commodity = ['eth', 'zec', 'xmr', 'ltc', 'bch', 'xrp', 'doge', 'ada', 'btc']
  //   const currency = ['eur', 'usdt']
  //   let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${commodity[0]}${currency[0]}@trade`)
  //   ws.onmessage = (event) => {
  //     let stockObj = JSON.parse(event.data)
  //     console.log(stockObj.p)
  //     setStockPrice(stockObj.p)
  //   }

    // <symbol>@kline_<interval>
    // let ws1 = new WebSocket(`wss://stream.binance.com:9443/ws/${commodity[0]}${currency[0]}@kline_15s`)
    // ws1.onmessage = (event) => {
    //   let stockObj = JSON.parse(event.data)
    //   console.log(stockObj)
    // }

  // }, [stockPrice === 0])


  return (
    <Box>
      <BrowserRouter>
      <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/price-tracker/:coinCode" element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
