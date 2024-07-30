import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

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
                value: flight.flight_id,
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
    }, []);

    const addNotification = async () => {
        try {
            const timestamp = new Date().toISOString();
            await axios.post('http://localhost:5000/api/users', {
                flight_id: flightId.value,
                method,
                recipient,
                timestamp,
                token
            });
            setSuccessMessage('Notification added successfully!');
            setError('');
            setFlightId(null);
            setMethod('');
            setRecipient('');
            setToken('');
        } catch (error) {
            setError('Failed to add notification.');
            console.error('Error adding notification:', error);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Add Flight Notification</h1>
            {error && <p style={errorStyle}>{error}</p>}
            {successMessage && <p style={successStyle}>{successMessage}</p>}
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
                style={inputStyle}
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
                    style={inputStyle}
                />
            )}
            {method === 'Phone' && (
                <input
                    type="tel"
                    placeholder="Recipient Phone Number"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={inputStyle}
                />
            )}
            {method === 'App' && (
                <input
                    type="text"
                    placeholder="Recipient App ID"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={inputStyle}
                />
            )}
            <button onClick={addNotification} style={buttonStyle}>Add Notification</button>
        </div>
    );
};

// Styles adapted from FlightStatus component
const containerStyle = {
    width: '80%',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    padding: '20px'
};

const headingStyle = {
    textAlign: 'center',
    color: '#4B0082',
    margin: '20px 0',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '24px'
};

const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
};

const errorStyle = {
    color: 'red',
    marginBottom: '10px'
};

const successStyle = {
    color: 'green',
    marginBottom: '10px'
};

const customSelectStyles = {
    container: (provided) => ({
        ...provided,
        marginBottom: '10px',
        width: '100%'
    }),
    control: (provided) => ({
        ...provided,
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px'
    })
};

export default NotificationForm;
