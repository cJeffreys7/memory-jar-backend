import React, { useState } from 'react';

// components
import FormInput from '../../components/FormInput';
import Button from '../../components/MUI/StyledButton';

import Icon from '../../assets/memoryjar_icon.svg'
import LogoText from '../../assets/memoryjar_logo_text_dark.svg'

import './index.scss'

const initialFormData = {
    email: '',
    password: ''
}

const SignIn = (props) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setFormData(initialFormData);
    }

    const { email, password } = formData;

    return (
        <div className='wrapper'>
            <img src={Icon} alt='Memory Jar Icon' />
            <img src={LogoText} alt='Memory Jar' />
            <form onSubmit={handleSubmit}>
                <FormInput 
                    className='input'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleChange}
                />
                <FormInput 
                    className='input'
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleChange}
                />
                <Button type='submit' label='Login'/>
            </form>
        </div>
    );
};

export default SignIn;