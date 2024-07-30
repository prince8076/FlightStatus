import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightStatus from './Component/FlightStatus';
import AdminPage from './Component/AdminPage';
import NotificationForm from './Component/NotificationForm';

function App() {




  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightStatus />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/notifications" element={<NotificationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
