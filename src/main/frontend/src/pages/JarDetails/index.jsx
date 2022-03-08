import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

// components
import FormInput from '../../components/FormInput';
import JarViewer from '../../components/JarViewer';
import Button from '../../components/MUI/StyledButton';

import './index.scss'

const initialFormData = {
    // owner: '',
    // admins: '',
    title: '',
    description: ''
}

const initialViewerPermissions = {
    email: '',
    viewers: []
}

const initialErrors = {}

const Jar = (props) => {
    const { currentUser } = props
    const [errors, setErrors] = useState(initialErrors);
    const [formData, setFormData] = useState(initialFormData);
    const [viewerPermissions, setViewerPermissions] = useState(initialViewerPermissions);

    const handleChange = e => {
        console.log('Setting form data');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [`${e.target.name}Entry`]: true
        });
    }

    const handleChangeEmail = e => {
        if (e.target.name !== 'email') {
            console.log('Changing viewer permissions: ', e.target.value);
            setViewerPermissions({
                ...viewerPermissions,
                viewers: viewers.map(viewer => {
                    console.log('Viewer: ', viewer.email, e.target.value);
                    if (viewer.email === e.target.name) {
                        return {
                            email: e.target.name,
                            editPermissions: e.target.value
                        };
                    } else {
                        return viewer;
                    };
                })
            });
        } else {
            console.log('Adding email');
            setViewerPermissions({
                ...viewerPermissions,
                email: e.target.value
            });
        };
    };

    const handleEmailInviteSubmit = e => {
        e.preventDefault();
        console.log(`Sending invite to ${viewerPermissions.email}`);
        setViewerPermissions({
            ...viewerPermissions,
            viewers: [
                ...viewers,
                {
                    email: viewerPermissions.email,
                    editPermissions: false
                }
            ],
            email: ''
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const admins = viewerPermissions.viewers.filter(viewer => viewer.editPermissions).map(viewer => viewer.email);
        admins.unshift(currentUser.id);
        const formattedFormData = {
            owner: currentUser.id,
            admins: admins,
            ...formData
        };
        // setFormData({
        //     owner: currentUser.id,
        //     admins: admins,
        //     ...formData
        // });
        console.log('Form Data: ', formattedFormData);
        axios.post('http://localhost:8080/jar',
            formattedFormData,
            {
                headers: {
                    "Access-Control-Allow-Origin": true,
                    "Content-Type": "application/xml"
                },
            }
        ).then(() => {
            console.log('Form Data updated successfully!');
        }).catch((err) => {
            console.log('Error uploading form data: ', err);
        });
    }

    const { title, description } = formData;
    const { email, viewers } = viewerPermissions;

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
                <form className='share-jar-form'>
                    <FormInput 
                        className='input'
                        name='email'
                        type='text'
                        label='Email'
                        // error={nameError}
                        // helperText={nameError ? nameHelperText : ''}
                        value={email}
                        onChange={handleChangeEmail}
                        variant='standard'
                    />
                    <Button type='submit' label='Share' handleClick={handleEmailInviteSubmit}/>
                </form>
                <div className='jar-permissions'>
                    <div className='permissions-headers'>
                        <h5 id='viewers-header-title'>Viewers</h5>
                        <h5>Can Edit</h5>
                        <h5></h5>
                    </div>
                    <div className='jar-permissions-border'>
                        <div className='jar-permission-viewers'>
                            {viewerPermissions.viewers && 
                                viewerPermissions.viewers.map(viewer => (
                                    <JarViewer key={viewer.email} email={viewer.email} canEdit={viewer.editPermissions} handleChange={handleChangeEmail}/>
                                ))
                            }
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

Jar.defaultProps = {
    currentUser: null
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Jar);