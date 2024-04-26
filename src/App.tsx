import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box/Box';
import './App.scss';
import Home from './pages/Home/Home';
import CoinDetail from './pages/CoinDetail/CoinDetail';
import AppHeader from './components/AppHeader/AppHeader';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <AppHeader />
        {/* Defining routes for home, details & NotFound page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/price-tracker/:coinCode" element={<CoinDetail />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
