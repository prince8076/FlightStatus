import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getFlights = async () => {
    const response = await axios.get(`${API_URL}/flights`);
    return response.data;
};

export const subscribe = async (email, sms) => {
    const response = await axios.post(`${API_URL}/subscribe`, { email, sms });
    return response.data;
};
