import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Explore from './pages/Explore';
import Jobs from './pages/Jobs';
import Market from './pages/Market';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Explore />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="market" element={<Market />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;