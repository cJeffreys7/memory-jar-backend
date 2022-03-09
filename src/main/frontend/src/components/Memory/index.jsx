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

const Memory = ({ img }) => {
    return (
        <div className='memory-wrapper'>
            <div className='border'>
                {
                    img ? img : 
                    <img src={defaultImg} alt="Memory Jar Icon" />
                }
                <div className='favorite-button'>
                    <IconButton {...configIconButton}/>
                </div>
            </div>
        </div>
    );
};

export default Memory;