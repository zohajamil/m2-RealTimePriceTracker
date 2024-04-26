import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box/Box';
import './App.scss';
import Home from './pages/Home/Home';
import CoinDetail from './pages/CoinDetail/CoinDetail';
import AppHeader from './components/AppHeader/AppHeader';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <AppHeader />
        {/* Defining routes for home and details page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/price-tracker/:coinCode" element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
