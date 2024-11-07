const redis = require('redis');

const  publisher = redis.createClient();
const subscriber  = redis.createClient();

publisher.on('error', (error) => console.error(`Publisher error: ${error}`))
subscriber.on('error', (error) => console.error(`Subscriber error: ${error}`))

module.exports = { publisher, subscriber};