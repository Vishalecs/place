const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/mydatabase1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
