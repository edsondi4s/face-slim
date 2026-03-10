import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Configs } from './components/Configs';
import { Settings } from './components/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/configs" element={<Configs />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
