const { subscriber } = require('../Client');

const RoomSubscription = (roomId, callback) => {
    subscriber.subscribe(roomId);

    subscriber.on('message', (channel, message) =>
    {
        if(channel === roomId){
            const messageData = JSON.parse(message);
            callback(messageData);
        }
    });
};

module.export = {RoomSubscription};
