import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConstructorPage from './pages/ConstructorPage/ConstructorPage';
import FeedPage from './pages/FeedPage/FeedPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;