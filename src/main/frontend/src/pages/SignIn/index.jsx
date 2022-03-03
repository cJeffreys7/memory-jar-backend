import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

// components
import FormInput from '../../components/FormInput';
import Button from '../../components/MUI/StyledButton';
import { createTheme } from '@mui/material';

// assets
import Icon from '../../assets/memoryjar_icon.svg'
import LogoText from '../../assets/memoryjar_logo_text_dark.svg'

import './index.scss'

const initialFormData = {
    email: '',
    password: ''
}

const initialErrors = {
    emailEntry: false,
    emailError: false,
    emailHelperText: 'Invalid email',
    passwordEntry: false,
    passwordError: false,
    passwordHelperText: 'Invalid password'
}

// const initialValidation = {
//     validationDelay: {},
//     isDelayed: false,
//     delayRate: 500
// }

const SignIn = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    // const [validation, setValidation] = useState(initialValidation);

    // let validationDelays = {};
    // let isDelayed = false;
    // let delayRate = 1000;

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

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(email, password);
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
    // const { validationDelay, isDelayed, delayRate } = validation;


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

    // const inputCheck = (validationMethods) => {
    //     if (isDelayed) {
    //         interruptValidationDelay()
    //     }
    //     isDelayed = true;
    //     validationDelay = setTimeout(() => {
    //         for (const method of validationMethods) {
    //             method();
    //         }
    //         // validationMethod();
    //         isDelayed = false;
    //     }, delayRate);
    // }

    // const emailInputCheck = () => {
    //     if (isDelayed) {
    //         interruptValidationDelay('email')
    //     }
    //     isDelayed = true;
    //     const emailValidationDelay = setTimeout(() => {
    //         isDelayed = false;
    //         return emailValidation();
    //     }, delayRate);
    //     validationDelays = {
    //         ...validationDelays,
    //         email: emailValidationDelay
    //     }
    //     console.log('Delay timers:', validationDelays);
    // }

    const emailValidation = () => {
        // console.log('Validating email...');
        let error = {};
        if (!email) {
            // console.log('No email entered');
            error = {
                emailError: true,
                emailHelperText: 'Please enter your email'
            }
        } else {
            const emailExpression = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
            const emailRegExp = new RegExp(emailExpression)
            if (email.match(emailRegExp)) {
                // console.log('Email matches email pattern');
                error = {
                    emailError: false
                }
            } else {
                // console.log('Email does not match email pattern');
                error = {
                    emailError: true,
                    emailHelperText: 'Invalid email'
                }
            }
        }

        return error;
    }

    // const passwordInputCheck = () => {
    //     if (isDelayed) {
    //         interruptValidationDelay('password')
    //     }
    //     isDelayed = true;
    //     const passwordValidationDelay = setTimeout(() => {
    //         isDelayed = false;
    //         return passwordValidation();
    //     }, delayRate);
    //     validationDelays = {
    //         ...validationDelays,
    //         password: passwordValidationDelay
    //     }
    // }

    const passwordValidation = () => {
        // console.log('Validating password...');
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

    // const interruptValidationDelay = (delayType) => {
    //     switch(delayType) {
    //         case 'email':
    //             clearTimeout(validationDelays.email);
    //         case 'password':
    //             clearTimeout(validationDelays.password);
    //         default:
    //             clearTimeout();
    //     }
    // }

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

    const loginUser = (email, password) => {
        const userPool = new CognitoUserPool({
            UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
            ClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
        });

        const user = new CognitoUser({ Username: email, Pool: userPool });

        const authenticationData = { Username: email, Password: password };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        return new Promise((resolve, reject) =>
            user.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    resolve(result);
                    console.log('Login successful: ', result);
                    navigate('/');
                },
                onFailure: err => {
                    reject(err);
                    console.log('Login failed: ', err);
                }
            })
        );
    }

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