const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan'); 

// Load environment variables
const connectDB = require('./db.js')
dotenv.config({path: './config.env'});

// connect To Database

connectDB();

// Import transactions routes
const transactions = require('./routes/transactions.js'); // Corrected path if routes is in the same folder as server.js

const app = express();

// Middleware
app.use(express.json()); // To handle JSON body parsing

if(process.env.NODE_ENV === 'devlopment') {
  app.use(morgan('dev')); 
}

// Routes
app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static( path.join(__dirname, '../client/build')));

  app.get('*',(req, res) => res.join(path.resolve(__dirname, '../client/build', 'index.html')));
}



// Port setup
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`.yellow.bold
  );
});
