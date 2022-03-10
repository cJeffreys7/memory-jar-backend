import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { createTheme } from '@mui/material';

// components
import IconButton from '../MUI/IconButton';

// assets
import FavoriteIcon from '@mui/icons-material/Favorite';
import defaultImg from '../../assets/memoryjar_logo_dark.svg';

// services
import * as memoryJarService from '../../services/memoryJarService'

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

const Memory = ({ memoryJar }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [randomMemoryFavorited, setRandomMemoryFavorited] = useState(false);

    const settings = {
        autoplay: true,
        autoplaySpeed: 5000,
        swipe: true,
        fade: true,
        speed: 1500,
        infinite: true,
        pauseOnHover: true,
        className: 'carousel',
        afterChange: (current) => setSlideIndex(current)
    };

    const favoriteMemory = () => {
        console.log('Favoriting Memory ', memoryJar?.data.memories[slideIndex].title);
        const result = memoryJarService.favoriteMemory(memoryJar, memoryJar.data.memories[slideIndex].filename, !randomMemoryFavorited);
        if (result) {
            memoryJar.data.memories[slideIndex].isFavorited = !randomMemoryFavorited;
            setRandomMemoryFavorited(!randomMemoryFavorited);
        };
    }

    const configIconButton = {
        theme: theme,
        icon: <FavoriteIcon />,
        handleClick: favoriteMemory
    }

    useEffect(() => {
        setRandomMemoryFavorited(memoryJar?.data.memories[slideIndex].isFavorited);
    }, [slideIndex])

    return (
        <div className='memory-wrapper'>
            <div className='border'>
                <div className='image'>
                    <Slider {...settings}>
                        {memoryJar?.data.memories?.length ? 
                            memoryJar.data.memories.map(memory => <img src={`http://localhost:8080/jars/${memoryJar.data.jarId}/memories/${memory.filename}`} alt={memory.title} key={memory.filename}/>)
                            : <img src={defaultImg} alt="Memory Jar Icon" />
                        }
                    </Slider>
                </div>
                <div className='favorite-button-wrapper'>
                    <div className='favorite-button'>
                        <IconButton {...configIconButton} isPressed={randomMemoryFavorited}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Memory;