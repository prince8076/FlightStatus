// src/App.js
import React, { useEffect } from 'react';
import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightStatus from './Component/FlightStatus';
import AdminPage from './Component/AdminPage';
import NotificationForm from './Component/NotificationForm';

function App() {

  async function requestPermissions() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Generate token
        const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
        console.log("Token generated:", token);
      } else if (permission === 'denied') {
        alert('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission or generating token:', error);
      alert('Error requesting notification permission or generating token:' + error);
    }
  }

  useEffect(() => {
    // Request user for notifications
    requestPermissions();
  }, []);

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
