const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://dark:dark@mern.sywzsjn.mongodb.net/ahamalar?retryWrites=true&w=majority&appName=test123')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

