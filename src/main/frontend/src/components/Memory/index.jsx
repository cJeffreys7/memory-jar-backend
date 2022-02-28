import React from 'react';

import defaultImg from '../../assets/memoryjar_logo_dark.svg';
import { createTheme } from '@mui/material';
import IconButton from '../MUI/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import './styles.scss'

const theme = createTheme({
    palette: {
        primary: {
            main: '#c43232'
        },
        secondary: {
            main: '#a0a0a0'
        }
    }
})

const configIconButton = {
    theme: theme,
    icon: <FavoriteIcon />
}

const Memory = () => {
    return (
        <div className='wrapper'>
            <div className='border'>
                <img src={defaultImg} alt="Memory Jar Icon" />
                <IconButton {...configIconButton}/>
            </div>
        </div>
    );
};

export default Memory;