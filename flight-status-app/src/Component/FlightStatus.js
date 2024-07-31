import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FlightStatus = () => {
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    const fetchFlightData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/flights');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched flight data:', data);
            setFlights(data);
        } catch (error) {
            console.error('Error fetching flight data:', error);
        }
    };

    useEffect(() => {
        fetchFlightData();
    }, []);

    const containerStyle = {
        width: '80%',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#262626',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#ffffff',
        margin: '0',
        padding: '20px 0',
        fontSize: '36px',
        fontWeight: '700',
        letterSpacing: '1.5px',
        fontFamily: 'Poppins, sans-serif',
    };

    const buttonStyle = {
        display: 'block',
        width: 'max-content',
        margin: '20px auto',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '18px',
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thStyle = {
        padding: '12px 15px',
        textAlign: 'center',
        backgroundColor: '#333',
        color: '#ffffff',
        fontWeight: 'bold',
    };

    const tdStyle = {
        padding: '12px 15px',
        textAlign: 'center',
        backgroundColor: '#1f1f1f',
        color: '#ffffff',
        border: '1px solid #555',
    };

    const trStyle = {
        transition: 'background-color 0.3s',
    };

    const trHoverStyle = {
        backgroundColor: '#333',
    };

    return (
        <div className="flight-status" style={containerStyle}>
            <h1 style={headingStyle}>Flight Status</h1>
            <Link
                to="/notifications"
                style={buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
                Stay Updated - Subscribe for Notifications
            </Link>
            <button
                style={{ ...buttonStyle, marginTop: '10px' }} // Adding some space between buttons
                onClick={() => navigate('/search')}
            >
                Search Your Flight
            </button>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Flight ID</th>
                        <th style={thStyle}>Airline</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Departure Gate</th>
                        <th style={thStyle}>Arrival Gate</th>
                        <th style={thStyle}>Scheduled Departure</th>
                        <th style={thStyle}>Scheduled Arrival</th>
                        <th style={thStyle}>Actual Departure</th>
                        <th style={thStyle}>Actual Arrival</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr
                            key={flight._id}
                            style={trStyle}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <td style={tdStyle}>{flight.flight_id}</td>
                            <td style={tdStyle}>{flight.airline}</td>
                            <td style={tdStyle}>{flight.status}</td>
                            <td style={tdStyle}>{flight.departure_gate}</td>
                            <td style={tdStyle}>{flight.arrival_gate}</td>
                            <td style={tdStyle}>{new Date(flight.scheduled_departure).toLocaleString()}</td>
                            <td style={tdStyle}>{new Date(flight.scheduled_arrival).toLocaleString()}</td>
                            <td style={tdStyle}>{flight.actual_departure ? new Date(flight.actual_departure).toLocaleString() : 'N/A'}</td>
                            <td style={tdStyle}>{flight.actual_arrival ? new Date(flight.actual_arrival).toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightStatus;
