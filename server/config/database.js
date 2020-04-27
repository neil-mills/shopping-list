//Import mongoose
const mongoose = require('mongoose');

//Connect to Mongo DB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

mongoose.connection.once('open', () => console.log('Connected to mongo DB'));
mongoose.connection.on('error', error => console.error(error));

module.exports = mongoose;
