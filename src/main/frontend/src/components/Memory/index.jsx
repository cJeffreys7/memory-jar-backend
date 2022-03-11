import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCurrentMemoryJar } from '../../redux/MemoryJar/memoryJarActions';
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

const Memory = (props) => {
    const { currentMemoryJar, setCurrentMemoryJar, showFavoritesOnly } = props;
    const [slideIndex, setSlideIndex] = useState(0);
    const [memoryFavorited, setMemoryFavorited] = useState(false);

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
        console.log('Favoriting Memory ', currentMemoryJar?.memories[slideIndex].title);
        const result = memoryJarService.favoriteMemory(currentMemoryJar, currentMemoryJar.memories[slideIndex].filename, !memoryFavorited);
        if (result) {
            //! Dispatch setCurrentMemoryJar
            let updatedMemories = [...currentMemoryJar.memories];
            let updatedMemory = {...updatedMemories[slideIndex]};
            updatedMemory.isFavorited = !memoryFavorited;
            updatedMemories[slideIndex] = updatedMemory;
            setCurrentMemoryJar({
                ...currentMemoryJar,
                memories: updatedMemories
            })
            // currentMemoryJar.memories[slideIndex].isFavorited = !memoryFavorited;
            setMemoryFavorited(!memoryFavorited);
        };
    }

    const configIconButton = {
        theme: theme,
        icon: <FavoriteIcon />,
        handleClick: favoriteMemory
    }

    useEffect(() => {
        if (currentMemoryJar?.memories) {
            setMemoryFavorited(currentMemoryJar.memories[slideIndex].isFavorited);
        }
    }, [slideIndex])

    return (
        <div className='memory-wrapper'>
            <div className='border'>
                <div className='image'>
                    <Slider {...settings}>
                        {currentMemoryJar?.memories?.length ? 
                            currentMemoryJar.memories.map(memory => <img src={`http://localhost:8080/jars/${currentMemoryJar.jarId}/memories/${memory.filename}`} alt={memory.title} key={memory.filename}/>)
                            : <img src={defaultImg} alt="Memory Jar Icon" />
                        }
                    </Slider>
                </div>
                <div className='favorite-button-wrapper'>
                    <div className='favorite-button'>
                        <IconButton {...configIconButton} isPressed={memoryFavorited}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ memoryJar }) => ({
    currentMemoryJar: memoryJar.currentMemoryJar
});

const mapDispatchToProps = dispatch => ({
    setCurrentMemoryJar: memoryJar => dispatch(setCurrentMemoryJar(memoryJar))
});

export default connect(mapStateToProps, mapDispatchToProps)(Memory);