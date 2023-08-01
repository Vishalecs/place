const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://vishalsinghecs99:Vishal123321@cluster0.wl8btby.mongodb.net/placement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
