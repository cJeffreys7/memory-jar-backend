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
import Skeleton from '@mui/material/Skeleton';

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
    const { currentMemoryJar, setCurrentMemoryJar, showFavoritesOnly, showRandomMemory, showRandomFavoriteMemory, loading } = props;
    const [slideIndex, setSlideIndex] = useState(0);
    const [memories, setMemories] = useState([]);

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

    const favoriteMemory = async () => {
        if (memories.length) {
            const result = await memoryJarService.favoriteMemory(
                    currentMemoryJar,
                    currentMemoryJar.memories[slideIndex].filename,
                    !currentMemoryJar.memories[slideIndex].isFavorited
                );
            if (result) {
                setCurrentMemoryJar(result.data);
            };
        }
    }

    useEffect(() => {
        setMemories([]);
        const formatMemories = () => {
            if (!loading && currentMemoryJar.memories) {
                const filteredMemories = showFavoritesOnly ? 
                    currentMemoryJar.memories.filter(memory => memory.isFavorited)
                    : currentMemoryJar.memories;
                // console.log(`Filtered memories for ${showFavoritesOnly ? 'Favorite Memories' : 'All Memories'}`, filteredMemories);
                const mappedMemories = filteredMemories.map(memory => 
                    ({
                        image: {
                            src: `http://localhost:8080/jars/${currentMemoryJar.jarId}/memories/${memory.filename}`,
                            alt: memory.title,
                            key: memory.filename
                        },
                        isFavorited: memory.isFavorited
                    })
                );
                setMemories(mappedMemories);
            };
        };

        formatMemories();
    }, [currentMemoryJar]);

    const configIconButton = {
        theme: theme,
        icon: <FavoriteIcon />,
        handleClick: favoriteMemory
    }

    return (
        <div className='memory-wrapper'>
            <div className='border'>
                {!loading ?
                    <>
                        <div className='image'>
                            <Slider {...settings}>
                                {memories.length ?
                                    memories.map(
                                        memory => <img
                                                    src={memory.image.src}
                                                    alt={memory.image.alt}
                                                    key={memory.image.key} 
                                                    />
                                                )
                                    : <img src={defaultImg} alt='Memory Jar Logo'/>
                                }
                            </Slider>
                        </div>
                        <div className='favorite-button-wrapper'>
                            <div className='favorite-button'>
                                <IconButton
                                    {...configIconButton}
                                    isPressed={memories ? 
                                                memories[slideIndex]?.isFavorited
                                                : false}
                                />
                            </div>
                        </div>
                    </>
                    : <Skeleton variant="text" />}
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