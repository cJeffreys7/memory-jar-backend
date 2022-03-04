import React, { useState, useEffect } from 'react';
import axios from 'axios';

// components
import FormInput from '../../components/FormInput';
import JarViewer from '../../components/JarViewer';
import Button from '../../components/MUI/StyledButton';

import './index.scss'

const initialFormData = {
    title: '',
    description: '',
    email: ''
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
        setErrors({
            ...errors,
            [`${e.target.name}Entry`]: true
        });
    }

    const handleEmailInviteSubmit = e => {
        e.preventDefault();
        console.log('Sending invite to ');
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    const { title, description, email } = formData

    const { 
        titleEntry,
        titleError,
        titleHelperText,
        descriptionEntry,
        descriptionError,
        descriptionHelperText
    } = errors;

    useEffect(() => {
        const formCheck = async => {
            let errors = [];
            if (titleEntry) {
                errors.push({ titleEntry: true });
                errors.push(titleValidation());
            }
            if (descriptionEntry) {
                errors.push({ descriptionEntry: true });
                errors.push(descriptionValidation());
            }
            let formErrors = {};
            errors.forEach(error => {
                formErrors = {
                    ...formErrors,
                    ...error
                }
            })
            setErrors({
                ...errors,
                ...formErrors
            })
        }

        formCheck();
    }, [title, description]);

    const titleValidation = () => {
        let error = {};
        if (!title) {
            error = {
                titleError: true,
                titleHelperText: 'Please enter a name for this Memory Jar'
            }
        } else {
            error = {
                titleError: false
            }
        }
        return error;
    }

    const descriptionValidation = () => {
        let error = {};
        if (!description) {
            error = {
                descriptionError: true,
                descriptionHelperText: 'Please enter a description for this Memory Jar'
            }
        } else {
            error = {
                descriptionError: false
            }
        }
        return error;
    }

    const isFormInvalid = () => {
        return !(title && description)
    }

    return (
        <div className='jar-wrapper'>
            <div className='memory-jar-form'>
                <form className='jar-details-form'>
                    <FormInput 
                        className='input'
                        name='title'
                        type='text'
                        label='New Memory Jar Name'
                        error={titleError}
                        helperText={titleError ? titleHelperText : ''}
                        value={title}
                        onChange={handleChange}
                        variant='standard'
                    />
                    <FormInput 
                        className='input'
                        name='description'
                        type='text'
                        label='Description'
                        error={descriptionError}
                        helperText={descriptionError ? descriptionHelperText : ''}
                        multiline={true}
                        rows={8}
                        value={description}
                        onChange={handleChange}
                        variant='outlined'
                    />
                </form>
                <span className='form-title'>Share Memory Jar</span>
                <form className='share-jar-form' onSubmit={handleEmailInviteSubmit}>
                    <FormInput 
                        className='input'
                        name='title'
                        type='text'
                        label='Email'
                        // error={nameError}
                        // helperText={nameError ? nameHelperText : ''}
                        value={email}
                        onChange={handleChange}
                        variant='standard'
                    />
                    <Button type='submit' label='Share'/>
                </form>
                <div className='jar-permissions'>
                    <div className='permissions-headers'>
                        <h5 id='viewers-header-title'>Viewers</h5>
                        <h5>Can Edit</h5>
                        <h5></h5>
                    </div>
                    <div className='jar-permissions-border'>
                        <div className='jar-permission-viewers'>
                            <JarViewer />
                            <JarViewer />
                            <JarViewer />
                            <JarViewer />
                            <JarViewer />
                            <JarViewer />
                            <JarViewer />
                            <JarViewer />
                            <JarViewer />
                            <JarViewer />
                        </div>
                    </div>
                </div>
                <Button 
                    type='submit'
                    label='Submit'
                    disabled={isFormInvalid()}
                    handleClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Jar;