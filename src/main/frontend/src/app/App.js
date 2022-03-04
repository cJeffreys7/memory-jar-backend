import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AppBar from '../components/MUI/AppBar';

// pages
import Home from '../pages/Home';
import Jar from '../pages/JarDetails';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UserProfiles from '../pages/UserProfiles';

// services
import * as authService from '../services/authService'

import './App.scss';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser());

  const handleLogout = () => {
    authService.logoutUser();
    setUser(null);
    navigate('/');
  }

  const handleSignUpOrSignIn = () => {
    setUser(authService.getUser());
  }

  return (
    <div className="App">
      <>
        {user && 
          <AppBar handleLogout={handleLogout}/>
        }
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/SignIn'/>} />
          <Route path='/SignIn' element={<SignIn handleSignUpOrSignIn={handleSignUpOrSignIn}/>}/>
          <Route path='/SignUp' element={<SignUp handleSignUpOrSignIn={handleSignUpOrSignIn}/>}/>
          <Route path='/jars/new' element={<Jar />}/>
        </Routes>
        {/* Photo Sharing Site
        <UserProfiles /> */}
      </>
    </div>
  );
}

export default App;
