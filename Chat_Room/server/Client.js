const redis = require('redis');

const { publisher, subscriber } = redis.createClient();

publisher.on('error', (error) => console.error(`Publisher error: ${error}`))
subscriber.on('error', (error) => console.error(`Publisher error: ${error}`))

module.exports = { publisher, subscriber};