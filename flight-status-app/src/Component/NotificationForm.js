import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';

const NotificationForm = () => {
    const [flightId, setFlightId] = useState(null);
    const [method, setMethod] = useState('');
    const [recipient, setRecipient] = useState('');
    const [token, setToken] = useState('');
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchFlights = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/flights');
            const flightOptions = response.data.map(flight => ({
                value: flight._id,
                label: `Flight ${flight.flight_id}`
            }));
            setFlights(flightOptions);
        } catch (error) {
            setError('Error fetching flights');
            console.error('Error fetching flights:', error);
        }
    };

    useEffect(() => {
        fetchFlights();
        // requestPermissions();
    }, []);

    const addNotification = async () => {
        try {
            const timestamp = new Date().toISOString();
            await axios.post('http://localhost:5000/api/users', {
                flight_id: flightId?.value,
                method,
                recipient,
                timestamp,
                token
            });
            setSuccessMessage('Notification added successfully!');
            setError('');
        } catch (error) {
            setError('Failed to add notification.');
            console.error('Error adding notification:', error);
        }
    };

    // async function requestPermissions() {
    //     try {
    //         const permission = await Notification.requestPermission();
    //         if (permission === 'granted') {
    //             const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
    //             setToken(token);
    //             console.log("Token generated:", token);
    //         } else if (permission === 'denied') {
    //             setError('Notification permission denied');
    //         }
    //     } catch (error) {
    //         setError('Error requesting notification permission or generating token');
    //         console.error('Error requesting notification permission or generating token:', error);
    //     }
    // }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Add Flight Notification</h1>
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            <Select
                options={flights}
                placeholder="Select Flight ID"
                value={flightId}
                onChange={(selectedOption) => setFlightId(selectedOption)}
                styles={customSelectStyles}
            />
            <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                style={styles.input}
            >
                <option value="">Select Notification Method</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="App">App</option>
            </select>
            {method === 'Email' && (
                <input
                    type="email"
                    placeholder="Recipient Email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={styles.input}
                />
            )}
            {method === 'Phone' && (
                <input
                    type="tel"
                    placeholder="Recipient Phone Number"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={styles.input}
                />
            )}
            {method === 'App' && (
                <input
                    type="text"
                    placeholder="Recipient App ID"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={styles.input}
                />
            )}
            <button onClick={addNotification} style={styles.button}>Add Notification</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: '#f9f9f9',
    },
    header: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        marginBottom: '10px',
    },
};

const customSelectStyles = {
    container: (provided) => ({
        ...provided,
        marginBottom: '10px',
        width: '100%',
    }),
    control: (provided) => ({
        ...provided,
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    }),
};

export default NotificationForm;