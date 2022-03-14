import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCurrentMemoryJar } from '../../redux/MemoryJar/memoryJarActions';
import { createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// components
import Slider from 'react-slick';
import IconButton from '../MUI/IconButton';

// assets
import FavoriteIcon from '@mui/icons-material/Favorite';
import DefaultImg from '../../assets/memoryjar_logo.svg';
import Skeleton from '@mui/material/Skeleton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// services
import * as memoryJarService from '../../services/memoryJarService'

import './styles.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DialogModal from '../MUI/DialogModal';

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
    const navigate = useNavigate();
    const { currentMemoryJar, setCurrentMemoryJar, showFavoritesOnly, showRandomMemory, showRandomFavoriteMemory, loading } = props;
    const [slideIndex, setSlideIndex] = useState(0);
    const [memories, setMemories] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteMemoryFile, setDeleteMemoryFile] = useState(null);

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

    const editMemory = () => {
        const memoryId = memories[slideIndex].image.key;
        navigate(`/jars/${currentMemoryJar.jarId}/memories/${memoryId}`)
    }

    const openDeleteMemoryModal = () => {
        if (memories[slideIndex]?.image) {
            setDeleteMemoryFile(memories[slideIndex].image);
            setDeleteModal(true);
        }
    }

    const closeDeleteMemoryModal = () => {
        setDeleteMemoryFile(null);
        setDeleteModal(false);
    }

    const deleteMemory = async () => {
        const result = await memoryJarService.deleteMemory(currentMemoryJar.jarId, deleteMemoryFile.key);
        setCurrentMemoryJar(result.data);
        closeDeleteMemoryModal();
    }

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
        };
    };

    useEffect(() => {
        setMemories([]);
        const formatMemories = () => {
            if (!loading && currentMemoryJar?.memories) {
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

    const configEditButton = {
        theme: theme,
        icon: <EditIcon />,
        handleClick: editMemory
    }

    const configDeleteButton = {
        theme: theme,
        icon: <DeleteIcon />,
        handleClick: openDeleteMemoryModal
    }

    const configIconButton = {
        theme: theme,
        icon: <FavoriteIcon />,
        handleClick: favoriteMemory
    }

    return (
        <div className='memory-wrapper'>
            <div className='border'>
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
                            : <img src={DefaultImg} alt='Memory Jar Logo'/>
                        }
                    </Slider>
                </div>
                <div className='action-button-wrapper'>
                    <div className='admin-buttons'>
                        <IconButton {...configEditButton}/>
                        <IconButton {...configDeleteButton}/>
                    </div>
                    <div className='favorite-button'>
                        <IconButton
                            {...configIconButton}
                            isPressed={memories ? 
                                        memories[slideIndex]?.isFavorited
                                        : false}
                        />
                    </div>
                </div>
            </div>
            <DialogModal 
                isOpen={deleteModal}
                title={'Delete Memory'}
                description={`Are you sure you want to throw away this memory of ${deleteMemoryFile?.alt}?`}
                confirmText={'Delete'}
                cancelText={'Cancel'}
                confirmHandleClick={deleteMemory}
                cancelHandleClick={closeDeleteMemoryModal}
            />
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