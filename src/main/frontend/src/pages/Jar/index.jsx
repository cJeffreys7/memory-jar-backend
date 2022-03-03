import React, { useState } from 'react';
import FormInput from '../../components/FormInput';
import JarViewer from '../../components/JarViewer';
import Button from '../../components/MUI/StyledButton';

import './index.scss'

const initialFormData = {
    title: '',
    description: '',
}

const initialErrors = {}

const Jar = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'email') {
            setErrors({
                ...errors,
                emailEntry: true
            })
        }
        if (e.target.name === 'password') {
            setErrors({
                ...errors,
                passwordEntry: true
            })
        }
    }

    const handleEmailInviteSubmit = e => {
        e.preventDefault();
        console.log('Sending invite to ');
    }

    const { title, description } = formData
    return (
        <div className='jar-wrapper'>
            <form className='memory-jar-form'>
                <FormInput 
                    className='input'
                    name='title'
                    type='text'
                    label='New Memory Jar Name'
                    // error={nameError}
                    // helperText={nameError ? nameHelperText : ''}
                    value={title}
                    onChange={handleChange}
                    variant='standard'
                />
                <FormInput 
                    className='input'
                    name='description'
                    type='text'
                    label='Description'
                    // error={nameError}
                    // helperText={nameError ? nameHelperText : ''}
                    multiline={true}
                    rows={8}
                    value={description}
                    onChange={handleChange}
                    variant='outlined'
                />
            </form>
            <form className='share-jar-form' onSubmit={handleEmailInviteSubmit}>
                <span>Share Memory Jar</span>
                <FormInput 
                    className='input'
                    name='title'
                    type='text'
                    label='Email'
                    // error={nameError}
                    // helperText={nameError ? nameHelperText : ''}
                    value={title}
                    onChange={handleChange}
                    variant='standard'
                />
                <Button type='submit' label='Share'/>
            </form>
            <div className='jar-permissions'>
                <div className='permissions-header'>
                    <h5>Viewers</h5>
                    <h5>Can Edit</h5>
                </div>
                <div className='jar-permissions-border'>
                    <div className='jar-permission-viewers'>
                        <JarViewer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jar;