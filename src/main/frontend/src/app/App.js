import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UserProfiles from '../pages/UserProfiles';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* Photo Sharing Site
      <UserProfiles /> */}
    </div>
  );
}

export default App;
