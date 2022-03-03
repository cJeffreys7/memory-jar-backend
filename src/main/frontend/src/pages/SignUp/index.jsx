import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { promisify } from 'util'

// assets
import Icon from '../../assets/memoryjar_icon.svg'
import LogoText from '../../assets/memoryjar_logo_text_dark.svg'

// components
import FormInput from '../../components/FormInput';
import Button from '../../components/MUI/StyledButton';
import { createTheme } from '@mui/material';

// services
import * as authService from '../../services/authService'

import './index.scss'

const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const initialErrors = {}

const SignUp = (props) => {
    const navigate = useNavigate();
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
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // const res = await signUp(userPool, email, name, password);
            // console.log('Signup success! Result: ', res);
            await authService.signUpUser(name, email, password);
            props.handleSignUpOrSignIn();
            setFormData(initialFormData);
            setErrors(initialErrors);
            navigate('/')
        } catch (error) {
            console.log('Signup failed. Error: ', error);
        };

    };

    // const signUp = async (userPool, email, name, password) => {
    //     const emailAttribute = new CognitoUserAttribute({
    //         Name: 'email',
    //         Value: email
    //     });
    //     const nameAttribute = new CognitoUserAttribute({
    //         Name: 'name',
    //         Value: name
    //     });

    //     let attributes = [emailAttribute, nameAttribute];
    //     const promisifiedSignUp = promisify(userPool.signUp).bind(userPool);

    //     return promisifiedSignUp(email, password, attributes, null);
    // }

    const { 
            name, 
            email, 
            password, 
            confirmPassword 
        } = formData;
    const { 
            nameEntry,
            nameError,
            nameHelperText,
            emailEntry,
            emailError,
            emailHelperText,
            passwordEntry,
            passwordError,
            passwordHelperText,
            confirmPasswordEntry,
            confirmPasswordError,
            confirmPasswordHelperText
        } = errors;

    useEffect(() => {
        const formCheck = async => {
            let errors = [];
            if (nameEntry) {
                errors.push({ nameEntry: true });
                errors.push(nameValidation());
            }
            if (emailEntry) {
                errors.push({ emailEntry: true });
                errors.push(emailValidation());
            }
            if (passwordEntry) {
                errors.push({ passwordEntry: true });
                errors.push(passwordValidation());
            }
            if (confirmPasswordEntry) {
                errors.push({ confirmPasswordEntry: true });
                errors.push(confirmPasswordValidation());
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
    }, [name, email, password, confirmPassword]);

    const nameValidation = () => {
        // console.log('Validating name...');
        let error = {};
        if (!name) {
            error = {
                nameEntry: true,
                nameError: true,
                nameHelperText: 'Please enter your name'
            };
        } else {
            error = {
                nameError: false
            };
        };
        
        return error;
    };

    const emailValidation = () => {
        // console.log('Validating email...');
        let error = {};
        if (!email) {
            console.log('No email entered');
            error = {
                emailError: true,
                emailHelperText: 'Please enter your email'
            };
        } else {
            const emailExpression = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
            const emailRegExp = new RegExp(emailExpression);
            if (email.match(emailRegExp)) {
                // console.log('Email matches email pattern');
                error = {
                    emailError: false
                };
            } else {
                // console.log('Email does not match email pattern');
                error = {
                    emailError: true,
                    emailHelperText: 'Invalid email'
                };
            };
        };

        return error;
    }

    const passwordValidation = () => {
        // console.log('Validating password...');
        let error = {};
        if (!password) {
            error = {
                passwordError: true,
                passwordHelperText: 'Please enter a password'
            };
        } else if (password.length < 8) {
                error = {
                    passwordError: true,
                    passwordHelperText: 'Password should be atleast 8 characters'
                };
        } else if (!(/[A-Z]/.test(password))) {
            error = {
                passwordError: true,
                passwordHelperText: 'Need atleast one uppercase letter'
            };
        } else if (!(/[a-z]/.test(password))) {
            error = {
                passwordError: true,
                passwordHelperText: 'Need atleast one lowercase letter'
            };
        } else if (!(/\d/.test(password))) {
            error = {
                passwordError: true,
                passwordHelperText: 'Need atleast one number'
            };
        // } else if (!(/\W/.test(password))) {
        //     error = {
        //         passwordError: true,
        //         passwordHelperText: 'Need atleast special character'
        //     };
        } else {
            error = {
                passwordError: false
            };
        };

        return error;
    };

    const confirmPasswordValidation = () => {
        // console.log('Validating confirm password...');
        let error = {};
        if (confirmPassword !== password) {
            error = {
                confirmPasswordError: true,
                confirmPasswordHelperText: 'Passwords do not match'
            };
        } else if (!confirmPassword) {
            error = {
                confirmPasswordError: true,
                confirmPasswordHelperText: 'Please enter password again'
            };
        } else {
            error = {
                confirmPasswordError: false
            };
        };

        return error;
    };

    const isFormInvalid = () => {
        return (!(name && email && password && confirmPassword) || 
            errors.nameError || errors.emailError || errors.passwordError || errors.passwordConfirmError);
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000'
            },
        }
    })
    
    return (
        <div className='wrapper'>
            <img src={Icon} alt='Memory Jar Icon' />
            <img src={LogoText} alt='Memory Jar' />
            <div className='signup-wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='form-input-border'>
                        <FormInput 
                            className='input'
                            name='name'
                            type='text'
                            label='Name'
                            error={nameError}
                            helperText={nameError ? nameHelperText : ''}
                            value={name}
                            onChange={handleChange}
                            variant='standard'
                        />
                        <FormInput 
                            className='input'
                            name='email'
                            type='email'
                            label='Email'
                            error={emailError}
                            helperText={emailError ? emailHelperText : ''}
                            value={email}
                            onChange={handleChange}
                            variant='standard'
                        />
                        <FormInput 
                            className='input'
                            name='password'
                            type='password'
                            label='Password'
                            error={passwordError}
                            helperText={passwordError ? passwordHelperText : ''}
                            value={password}
                            onChange={handleChange}
                            variant='standard'
                        />
                        <FormInput 
                            className='input'
                            name='confirmPassword'
                            type='password'
                            label='Confirm Password'
                            error={confirmPasswordError}
                            helperText={confirmPasswordError ? confirmPasswordHelperText : ''}
                            value={confirmPassword}
                            onChange={handleChange}
                            variant='standard'
                        />
                    </div>
                    <Button 
                        theme={theme}
                        type='submit' 
                        label='Sign Up' 
                        disabled={isFormInvalid()}
                    />
                </form>
                <span className='signin-prompt'>Already have an account?</span>
                <Link to='/signin'>Sign in</Link>
            </div>
        </div>
    );
};

export default SignUp;