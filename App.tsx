import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Explore from './pages/Explore';
import Jobs from './pages/Jobs';
import Market from './pages/Market';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Wallet from './pages/Wallet';
import Orders from './pages/Orders';
import Mentorship from './pages/Mentorship';
import Analytics from './pages/Analytics';
import MentorApplication from './pages/MentorApplication';
import MentorHub from './pages/MentorHub';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Onboarding Flow as Default */}
        <Route path="/" element={<Onboarding />} />
        
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Settings Page */}
        <Route path="/settings" element={<Settings />} />

        {/* Feature Pages (Standalone or as part of app context) */}
        <Route path="/app/wallet" element={<Wallet />} />
        <Route path="/app/orders" element={<Orders />} />
        <Route path="/app/mentorship" element={<Mentorship />} />
        <Route path="/app/analytics" element={<Analytics />} />
        <Route path="/app/mentor-application" element={<MentorApplication />} />
        <Route path="/app/mentor-hub" element={<MentorHub />} />

        {/* Main App Layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Explore />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="market" element={<Market />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;