import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { connect } from 'react-redux';


// components
// import Dropzone from '../../components/Dropzone';
import FormInput from '../../components/FormInput';
import Button from '../../components/MUI/StyledButton';

import './index.scss'

const initialErrors = {};

const initialFormData = {
    title: '',
    description: ''
};

const MemoryForm = (props) => {
    // const navigate = useNavigate();
    // const { currentUser } = props;
    const [errors, setErrors] = useState(initialErrors);
    const [formData, setFormData] = useState(initialFormData);

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

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Submitting formData: ', formData);
    }

    const { title, description } = formData;
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
                titleHelperText: 'Please enter a name for this Memory'
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
                descriptionHelperText: 'Please enter a description for this Memory'
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
        <div className='memory-form-wrapper'>
            <form className='memory-form' onSubmit={handleSubmit}>
                <FormInput 
                    className='input'
                    name='title'
                    type='text'
                    label='New Memory Name'
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
                {/* <Dropzone {}/> */}
                <Button
                    type='submit'
                    label='Submit'
                    disabled={isFormInvalid()}
                />
            </form>
        </div>
    );
};

// MemoryForm.defaultProps = {
//     currentUser: null
// };

// const mapStateToProps = ({ user }) => ({
//     currentUser: user.currentUser
// });

export default MemoryForm;