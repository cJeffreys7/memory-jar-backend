import React from 'react';

import defaultImg from '../../assets/memoryjar_logo_dark.svg'

import './styles.scss'

const Memory = () => {
    return (
        <div className='wrapper'>
            <div className='border'>
                <img src={defaultImg} alt="Memory Jar Icon" />
            </div>
        </div>
    );
};

export default Memory;