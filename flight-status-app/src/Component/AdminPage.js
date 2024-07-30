import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [flights, setFlights] = useState([]);
    const [formData, setFormData] = useState({
        flight_id: '',
        airline: '',
        status: '',
        departure_gate: '',
        arrival_gate: '',
        scheduled_departure: '',
        scheduled_arrival: '',
        actual_departure: '',
        actual_arrival: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/flights');
            const data = await response.json();
            setFlights(data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);

        try {
            const response = await fetch(`http://localhost:5000/api/flights${editId ? `/${editId}` : ''}`, {
                method: editId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(editId ? 'Flight updated successfully' : 'Flight added successfully');
                fetchFlights();
                setFormData({
                    flight_id: '',
                    airline: '',
                    status: '',
                    departure_gate: '',
                    arrival_gate: '',
                    scheduled_departure: '',
                    scheduled_arrival: '',
                    actual_departure: '',
                    actual_arrival: ''
                });
                setEditId(null);
            } else {
                const errorText = await response.text();
                console.error('Error response:', response.status, errorText);
                alert(`Error saving flight data: ${errorText}`);
            }
        } catch (error) {
            console.error('Error saving flight data:', error);
            alert('Error saving flight data. Please check the console for details.');
        }
    };



    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (flight) => {
        setFormData({
            flight_id: flight.flight_id,
            airline: flight.airline,
            status: flight.status,
            departure_gate: flight.departure_gate,
            arrival_gate: flight.arrival_gate,
            scheduled_departure: flight.scheduled_departure,
            scheduled_arrival: flight.scheduled_arrival,
            actual_departure: flight.actual_departure,
            actual_arrival: flight.actual_arrival
        });
        setEditId(flight._id);
    };
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this flight?')) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/flights/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Flight deleted successfully');
                fetchFlights();
            } else {
                const errorText = await response.text();
                console.error('Error response:', response.status, errorText);
                alert(`Error deleting flight: ${errorText}`);
            }
        } catch (error) {
            console.error('Error deleting flight:', error);
            alert('Error deleting flight. Please check the console for details.');
        }
    };


    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        },
        formContainer: {
            width: '100%',
            maxWidth: '800px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            marginBottom: '20px'
        },
        formTitle: {
            textAlign: 'center',
            marginBottom: '20px'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
        },
        button: {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.3s'
        },
        buttonHover: {
            backgroundColor: '#45a049'
        },
        tableContainer: {
            width: '100%',
            overflowX: 'auto'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white'
        },
        td: {
            padding: '10px',
            border: '1px solid #ddd',
            textAlign: 'center'
        },
        trEven: {
            backgroundColor: '#f2f2f2'
        },
        editButton: {
            backgroundColor: '#ffa500',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
            margin: '2px'
        },
        deleteButton: {
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
            margin: '2px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.formTitle}>{editId ? 'Edit Flight' : 'Add Flight'}</h1>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="flight_id" style={styles.label}>Flight ID</label>
                        <input
                            type="text"
                            id="flight_id"
                            name="flight_id"
                            value={formData.flight_id}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="airline" style={styles.label}>Airline</label>
                        <input
                            type="text"
                            id="airline"
                            name="airline"
                            value={formData.airline}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="status" style={styles.label}>Status</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="departure_gate" style={styles.label}>Departure Gate</label>
                        <input
                            type="text"
                            id="departure_gate"
                            name="departure_gate"
                            value={formData.departure_gate}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="arrival_gate" style={styles.label}>Arrival Gate</label>
                        <input
                            type="text"
                            id="arrival_gate"
                            name="arrival_gate"
                            value={formData.arrival_gate}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="scheduled_departure" style={styles.label}>Scheduled Departure</label>
                        <input
                            type="datetime-local"
                            id="scheduled_departure"
                            name="scheduled_departure"
                            value={formData.scheduled_departure}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="scheduled_arrival" style={styles.label}>Scheduled Arrival</label>
                        <input
                            type="datetime-local"
                            id="scheduled_arrival"
                            name="scheduled_arrival"
                            value={formData.scheduled_arrival}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="actual_departure" style={styles.label}>Actual Departure</label>
                        <input
                            type="datetime-local"
                            id="actual_departure"
                            name="actual_departure"
                            value={formData.actual_departure}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="actual_arrival" style={styles.label}>Actual Arrival</label>
                        <input
                            type="datetime-local"
                            id="actual_arrival"
                            name="actual_arrival"
                            value={formData.actual_arrival}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        {editId ? 'Update Flight' : 'Add Flight'}
                    </button>
                </form>
            </div>
            <div style={styles.tableContainer}>
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
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight, index) => (
                            <tr key={flight._id} style={index % 2 === 0 ? styles.trEven : {}}>
                                <td style={styles.td}>{flight.flight_id}</td>
                                <td style={styles.td}>{flight.airline}</td>
                                <td style={styles.td}>{flight.status}</td>
                                <td style={styles.td}>{flight.departure_gate}</td>
                                <td style={styles.td}>{flight.arrival_gate}</td>
                                <td style={styles.td}>{flight.scheduled_departure}</td>
                                <td style={styles.td}>{flight.scheduled_arrival}</td>
                                <td style={styles.td}>{flight.actual_departure}</td>
                                <td style={styles.td}>{flight.actual_arrival}</td>
                                <td style={styles.td}>
                                    <button style={styles.editButton} onClick={() => handleEdit(flight)}>Update</button>
                                    <button style={styles.deleteButton} onClick={() => handleDelete(flight.flight_id)}>Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
