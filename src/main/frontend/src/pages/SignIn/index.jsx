import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

// components
import FormInput from '../../components/FormInput';
import Button from '../../components/MUI/StyledButton';
import { createTheme } from '@mui/material';

// services
import * as authService from '../../services/authService'

// assets
import Icon from '../../assets/memoryjar_icon.svg'
import LogoText from '../../assets/memoryjar_logo_text_dark.svg'

import './index.scss'

const initialFormData = {
    email: '',
    password: ''
}

const initialErrors = {}

const SignIn = (props) => {
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
    }

    const handleSubmit = e => {
        e.preventDefault();
        authService.loginUser(email, password)
        .then((result) => {
            console.log('Login result: ', result);
            props.handleSignUpOrSignIn(email);
            navigate('/');
        })
        .catch((error) => {
            console.log('Error loging in: ', error);
        })
        setFormData(initialFormData);
        setErrors(initialErrors);
    }

    const { 
            email, 
            password 
        } = formData;
    const { 
            emailEntry, 
            emailError, 
            emailHelperText, 
            passwordEntry, 
            passwordError, 
            passwordHelperText 
        } = errors;

    useEffect(() => {
        const formCheck = async => {
            let errors = [];
            if (emailEntry) {
                errors.push({ emailEntry: true });
                errors.push(emailValidation());
            }
            if (passwordEntry) {
                errors.push({ passwordEntry: true });
                errors.push(passwordValidation());
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
    }, [email, password]);

    const emailValidation = () => {
        let error = {};
        if (!email) {
            error = {
                emailError: true,
                emailHelperText: 'Please enter your email'
            }
        } else {
            const emailExpression = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
            const emailRegExp = new RegExp(emailExpression)
            if (email.match(emailRegExp)) {
                error = {
                    emailError: false
                }
            } else {
                error = {
                    emailError: true,
                    emailHelperText: 'Invalid email'
                }
            }
        }

        return error;
    }

    const passwordValidation = () => {
        let error = {};
        if (!password) {
            error = {
                passwordError: true,
                passwordHelperText: 'Please enter a password'
            }
        } else {
            error = {
                passwordError: false
            }
        }
        return error;
    }

    const isFormInvalid = () => {
        return (!(email && password) || errors.passwordError || errors.emailError);
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000'
            },
        }
    })

    // const resetPassword = (username) => {
    //     const poolData = {
    //         UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    //         ClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    //     };
    //     const userPool = new CognitoUserPool(poolData);
    
    //     // setup cognitoUser first
    //     const cognitoUser = new CognitoUser({
    //         Username: username,
    //         Pool: userPool
    //     });
    
    //     // call forgotPassword on cognitoUser
    //     cognitoUser.forgotPassword({
    //         onSuccess: function(result) {
    //             console.log('call result: ', result);
    //         },
    //         onFailure: function(err) {
    //             alert(err);
    //         },
    //         inputVerificationCode() { // this is optional, and likely won't be implemented as in AWS's example (i.e, prompt to get info)
    //             var verificationCode = prompt('Please input verification code ', '');
    //             var newPassword = prompt('Enter new password ', '');
    //             cognitoUser.confirmPassword(verificationCode, newPassword, this);
    //         }
    //     });
    // }
    
    // // confirmPassword can be separately built out as follows...  
    // const confirmPassword = (username, verificationCode, newPassword) => {
    //     const userPool = new CognitoUserPool({
    //         UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    //         ClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    //     });
    //     const cognitoUser = new CognitoUser({
    //         Username: username,
    //         Pool: userPool
    //     });
    
    //     return new Promise((resolve, reject) => {
    //         cognitoUser.confirmPassword(verificationCode, newPassword, {
    //             onFailure(err) {
    //                 reject(err);
    //             },
    //             onSuccess() {
    //                 resolve();
    //             },
    //         });
    //     });
    // }

    return (
        <div className='wrapper'>
            <img src={Icon} alt='Memory Jar Icon' />
            <img src={LogoText} alt='Memory Jar' />
            <div className='signin-wrapper'>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        className='input'
                        name='email'
                        type='email'
                        label='Email'
                        error={emailError}
                        helperText={emailError ? emailHelperText : ''}
                        value={email}
                        onChange={handleChange}
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
                    />
                    <a href='#'>Forgot your password?</a>
                    <Button 
                        theme={theme}
                        type='submit' 
                        label='Login' 
                        disabled={isFormInvalid()}
                    />
                </form>
                <span className='signup-prompt'>Don't have an account?</span>
                <Link to='/signup'>Sign up</Link>
            </div>
        </div>
    );
};

export default SignIn;