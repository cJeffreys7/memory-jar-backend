import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import defaultImg from '../../assets/memoryjar_logo_dark.svg';
import { createTheme } from '@mui/material';
import IconButton from '../MUI/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import './styles.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Memory = ({ currentImg, previousImg }) => {

    const settings = {
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        speed: 1500,
        infinite: true,
        className: 'carousel'
    };

    return (
        <div className='memory-wrapper'>
            <div className='border'>
                <div className='image'>
                    <Slider {...settings}>
                        <div className='current-image'>
                            {
                                currentImg ? currentImg : 
                                <img src={defaultImg} alt="Memory Jar Icon" />
                            }
                        </div>
                        <div className='previous-image'>
                            {
                                previousImg ? previousImg : 
                                <img src={defaultImg} alt="Memory Jar Icon" />
                            }
                        </div>
                    </Slider>
                </div>
                <div className='favorite-button-wrapper'>
                    <div className='favorite-button'>
                        <IconButton {...configIconButton}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Memory;