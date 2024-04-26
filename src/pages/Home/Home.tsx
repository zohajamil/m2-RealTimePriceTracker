import { Grid } from '@mui/material';
import './home.scss';
import { coinData } from '../../common/CoinData';
import { ICoin } from '../../common/interfaces/Coin';
import CoinCard from '../../components/CoinCard/CoinCard';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Price Tracker App!</h1>
            <h2>Get Real Time Prices & data for your favorite coins.</h2>
            <Grid container spacing={2} justifyContent="center">
                {coinData.map((coin: ICoin) => (
                    <Grid item key={coin.code} data-testid="coin-card">
                        <CoinCard coin={coin} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
