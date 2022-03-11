import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/User/userActions';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AppBar from '../components/MUI/AppBar';

// pages
import Home from '../pages/Home';
import Jar from '../pages/JarForm';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import JarDetails from '../pages/JarDetails';
import MemoryForm from '../pages/MemoryForm';

// services
import * as authService from '../services/authService';

import './App.scss';

const App = (props) => {
  const { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    authService.logoutUser();
    setCurrentUser(null);
    navigate('/');
  }

  const handleSignUpOrSignIn = (email) => {
    const result = authService.getUser();
    console.log('User login result: ', result);
    setCurrentUser({
      id: email
    })
  }

  return (
    <div className="App">
      <>
        {currentUser && 
          <AppBar handleLogout={handleLogout}/>
        }
        <Routes>
          <Route path='/' element={currentUser ? <Home /> : <Navigate to='/SignIn'/>} />
          <Route path='/SignIn' element={<SignIn handleSignUpOrSignIn={handleSignUpOrSignIn}/>}/>
          <Route path='/SignUp' element={<SignUp handleSignUpOrSignIn={handleSignUpOrSignIn}/>}/>
          <Route path='/jars/new' element={currentUser ? <Jar /> : <Navigate to='/SignIn'/>}/>
          <Route path='/jars/:id' element={currentUser ? <JarDetails /> : <Navigate to='/SignIn' />}/>
          <Route path='/jars/:id/memories/new' element={currentUser ? <MemoryForm /> : <Navigate to='/SignIn' />}/>
        </Routes>
      </>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
