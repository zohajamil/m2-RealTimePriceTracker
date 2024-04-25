import React from 'react'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from '../../images/cryptocurrencyLogo.png';
import './appHeader.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const navigate = useNavigate()

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'start' }}>
                {window.location.pathname.includes('price-tracker') && (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => navigate(`/`)}>
                        <ArrowBackIcon color="action" />
                    </IconButton>
                )}
                <div className="same-row">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>Price Tracker App</h3>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader