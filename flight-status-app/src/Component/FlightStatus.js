import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FlightStatus = () => {
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

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

    const styles = {
        container: {
            width: '80%',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#262626',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            color: '#ffffff',
            fontFamily: 'Poppins, sans-serif',
        },
        heading: {
            textAlign: 'center',
            margin: '0',
            padding: '20px 0',
            fontSize: '36px',
            fontWeight: '700',
            letterSpacing: '1.5px',
        },
        button: {
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
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            padding: '12px 15px',
            textAlign: 'center',
            backgroundColor: '#333',
            color: '#ffffff',
            fontWeight: 'bold',
        },
        td: {
            padding: '12px 15px',
            textAlign: 'center',
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            border: '1px solid #555',
        },
        tr: {
            transition: 'background-color 0.3s',
        },
        trHover: {
            backgroundColor: '#333',
        },
    };

    return (
        <div className="flight-status" style={styles.container}>
            <h1 style={styles.heading}>Flight Status</h1>
            <Link
                to="/notifications"
                style={styles.button}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
                Stay Updated - Subscribe for Notifications
            </Link>
            <button
                style={{ ...styles.button, marginTop: '10px' }}
                onClick={() => navigate('/search')}
            >
                Search Your Flight
            </button>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Flight ID</th>
                        <th style={styles.th}>Airline</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Departure Gate</th>
                        <th style={styles.th}>Arrival Gate</th>
                        <th style={styles.th}>Scheduled Departure</th>
                        <th style={styles.th}>Scheduled Arrival</th>
                        <th style={styles.th}>Actual Departure</th>
                        <th style={styles.th}>Actual Arrival</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr
                            key={flight._id}
                            style={styles.tr}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <td style={styles.td}>{flight.flight_id}</td>
                            <td style={styles.td}>{flight.airline}</td>
                            <td style={styles.td}>{flight.status}</td>
                            <td style={styles.td}>{flight.departure_gate}</td>
                            <td style={styles.td}>{flight.arrival_gate}</td>
                            <td style={styles.td}>{new Date(flight.scheduled_departure).toLocaleString()}</td>
                            <td style={styles.td}>{new Date(flight.scheduled_arrival).toLocaleString()}</td>
                            <td style={styles.td}>{flight.actual_departure ? new Date(flight.actual_departure).toLocaleString() : 'N/A'}</td>
                            <td style={styles.td}>{flight.actual_arrival ? new Date(flight.actual_arrival).toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightStatus;
