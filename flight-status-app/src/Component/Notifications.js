import React, { useState } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [email, setEmail] = useState('');
    const [sms, setSms] = useState('');

    const subscribe = async () => {
        await axios.post('/api/subscribe', { email, sms });
        alert('Subscribed successfully!');
    };

    return (
        <div>
            <h1>Subscribe for Notifications</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={sms}
                onChange={(e) => setSms(e.target.value)}
            />
            <button onClick={subscribe}>Subscribe</button>
        </div>
    );
};

export default Notifications;
