import React from 'react'
import './coinCard.scss'
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { ICoinCardProps } from '../../common/interfaces/CoinCardProps';
import { useNavigate } from 'react-router-dom';

const CoinCard = (props: ICoinCardProps) => {
    const navigate = useNavigate()

    return (
        <Card onClick={()=> navigate(`/price-tracker/${props.coin.code}`)}>
            <CardMedia
                image={require(`../../images/${props.coin.iconUrl}`)}
                title={props.coin.code+'-logo'}
            />
            <CardContent>
                <Typography variant="h5" component="h2" align="center">
                    {props.coin.name}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CoinCard