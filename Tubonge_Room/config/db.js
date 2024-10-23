const mongoose = require('mongoose');
const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            userNewUrlParser: true,
            userUnifiedTopology: true,
        });
        console.log('Mongodb connected');
    } catch(error) {
        console.error(error.message)
        process.exit(1);
    }
};

module.exports = dbconnect;
