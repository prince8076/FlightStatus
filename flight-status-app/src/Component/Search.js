import React, { useState } from 'react';

const SearchFlight = () => {
    const [flightCode, setFlightCode] = useState('');
    const [flightInfo, setFlightInfo] = useState(null);
    const [error, setError] = useState('');

    const checkFlight = async () => {
        setError('');
        setFlightInfo(null);

        if (!flightCode) {
            setError('Please enter a flight code.');
            return;
        }

        const url = `http://localhost:5000/api/flights/${flightCode}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonObj = await response.json();
            if (jsonObj) {
                setFlightInfo(jsonObj);
            } else {
                setError('No flight information found.');
            }
        } catch (error) {
            console.error('Error fetching flight data:', error);
            setError('An error occurred while fetching flight data.');
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#262626',
            border: '3px solid black',
            borderRadius: '10px',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'IBM Plex Mono, monospace',
        },
        input: {
            width: '80%',
            padding: '10px',
            marginBottom: '10px',
            fontFamily: 'Heebo, sans-serif',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        button: {
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            marginTop: '10px',
        },
        buttonHover: {
            backgroundColor: '#e84300',
        },
        error: {
            color: 'red',
            marginTop: '10px',
        },
        flightInfo: {
            marginTop: '20px',
            textAlign: 'left',
        },
        boldTitle: {
            fontWeight: 600,
        },
    };

    return (
        <div style={styles.container}>
            <h2>Search Flight</h2>
            <input
                type="text"
                value={flightCode}
                onChange={(e) => setFlightCode(e.target.value)}
                placeholder="Enter flight code"
                style={styles.input}
            />
            <button
                style={styles.button}
                onClick={checkFlight}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
                Search
            </button>

            {error && <p style={styles.error}>{error}</p>}

            {flightInfo && (
                <div style={styles.flightInfo}>
                    <p><span style={styles.boldTitle}>Flight ID:</span> {flightInfo.flight_id}</p>
                    <p><span style={styles.boldTitle}>Airline:</span> {flightInfo.airline}</p>
                    <p><span style={styles.boldTitle}>Status:</span> {flightInfo.status}</p>
                    <p><span style={styles.boldTitle}>Departure Gate:</span> {flightInfo.departure_gate}</p>
                    <p><span style={styles.boldTitle}>Arrival Gate:</span> {flightInfo.arrival_gate}</p>
                    <p><span style={styles.boldTitle}>Scheduled Departure:</span> {new Date(flightInfo.scheduled_departure).toLocaleString()}</p>
                    <p><span style={styles.boldTitle}>Scheduled Arrival:</span> {new Date(flightInfo.scheduled_arrival).toLocaleString()}</p>
                    <p><span style={styles.boldTitle}>Actual Departure:</span> {new Date(flightInfo.actual_departure).toLocaleString()}</p>
                    <p><span style={styles.boldTitle}>Actual Arrival:</span> {new Date(flightInfo.actual_arrival).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default SearchFlight;
