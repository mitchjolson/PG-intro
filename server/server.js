const express = require('express');
const bodyParser = require('body-parser');

// Configure express app
const app = express();
app.use( express.static('server/public') );
app.use( bodyParser.urlencoded( {extended: true} ) );

// Routes 



// Start up the server
const PORT = process.env.PORT || 5000;
app.listen( PORT, () => (
    console.log( `Listening on port ${PORT}...` )
))