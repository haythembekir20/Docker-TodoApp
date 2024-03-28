const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const https = require('https');
const fs = require('fs');

const keys = require('./config/keys');
const apiRoutes = require('./routes/api');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const dbConnection = keys.mongoURI;

// Connect to Mongo
mongoose
  .connect(dbConnection, { useNewUrlParser: true, useCreateIndex: true }) 
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api', apiRoutes);
app.use('/static', express.static(__dirname + '/static'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

const httpsOptions = {
  key: fs.readFileSync('./security/cert.key'),
  cert: fs.readFileSync('./security/cert.pem')
};

const server = https.createServer(httpsOptions, app)
  .listen(port, () => {
      console.log('https server running at ' + port)
  });
  
