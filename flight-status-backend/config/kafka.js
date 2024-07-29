// const kafka = require('kafka-node');
// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); // Update with your Kafka host

// // Producer
// const producer = new kafka.Producer(client);
// producer.on('ready', () => console.log('Kafka Producer is connected and ready.'));
// producer.on('error', (err) => console.error('Kafka Producer error:', err));

// // Consumer
// const consumer = new kafka.Consumer(
//     client,
//     [{ topic: 'flight-updates', partition: 0 }],
//     { autoCommit: true }
// );
// consumer.on('error', (err) => console.error('Kafka Consumer error:', err));

// module.exports = { producer, consumer };


const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new kafka.Producer(client);
producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
    console.error('Kafka Producer error:', err);
});

const consumer = new kafka.Consumer(
    client,
    [{ topic: 'flight-updates', partition: 0 }],
    { autoCommit: true }
);

consumer.on('message', (message) => {
    console.log('Kafka Consumer message:', message);
});

consumer.on('error', (err) => {
    console.error('Kafka Consumer error:', err);
});

module.exports = { producer, consumer };
