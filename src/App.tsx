import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Configs } from './components/Configs';
import { Settings } from './components/Settings';
import { ConfigProvider } from './components/ConfigProvider';

export default function App() {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/configs" element={<Configs />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </ConfigProvider>
  );
}
