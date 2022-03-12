import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentMemoryJar } from '../../redux/MemoryJar/memoryJarActions';

// components
import Memory from '../../components/Memory';
import MemoryJarActionBar from '../../components/MemoryJarActionBar';
import IconButton from '../../components/MUI/IconButton';
import StorageIcon from '@mui/icons-material/Storage';

// services
import * as memoryJarService from '../../services/memoryJarService';

import './styles.scss'
import DialogModal from '../../components/MUI/DialogModal';

const JarDetails = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentMemoryJar, setCurrentMemoryJar } = props;
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);

    const configPopMemoryIconButton = {
        icon: <StorageIcon sx={{ fontSize: 128}}/>
    };

    const openDeleteJarModal = () => {
        setDeleteModal(true);
    }

    const closeDeleteJarModal = () => {
        setDeleteModal(false);
    }

    const deleteJar = async () => {
        const result = await memoryJarService.deleteJar(id);
        if (result) navigate('/');
    }

    useEffect(() => {
        const getMemoryJar = async (jarId) => {
            const newMemoryJar = await memoryJarService.getJar(jarId);
            setCurrentMemoryJar(newMemoryJar.data);
        };

        getMemoryJar(id);
        setLoading(false);
    }, [id])

    return (
        <div className='jar-details-wrapper'>
            <h1>{currentMemoryJar?.title}</h1>
            <MemoryJarActionBar jarId={id} deleteJar={openDeleteJarModal} />
            <h2>Favorite {currentMemoryJar?.title} Memories</h2>
            <Memory showFavoritesOnly={true} loading={loading} />
            <h2>{currentMemoryJar?.title} Memories</h2>
            <Memory loading={loading} />
            <DialogModal 
                isOpen={deleteModal}
                title={'Delete Memory Jar'}
                description={'Are you sure you want to throw away this memory jar? Any memories in here will be thwon away as well!'}
                confirmText={'Delete'}
                cancelText={'Cancel'}
                confirmHandleClick={deleteJar}
                cancelHandleClick={closeDeleteJarModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(JarDetails);