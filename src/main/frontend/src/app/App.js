import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import UserProfiles from '../pages/UserProfiles';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />}/>
      </Routes>
      {/* Photo Sharing Site
      <UserProfiles /> */}
    </div>
  );
}

export default App;
