const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool')

// Configure express app
const app = express();
app.use( express.static('server/public') );
app.use( bodyParser.urlencoded( {extended: true} ) );

// Routes 
app.get( '/music', (req, res) => {
    const sqlText = 'select * from songs order by rank asc;'
    pool.query(sqlText)
    .then( (response) => {
        console.log( 'Got music from the database', response );
        res.send(response);
    }).catch( (error) => {
        console.log('Error getting music from db', error)
        res.sendStatus(500);
    })
})


// Start up the server
const PORT = process.env.PORT || 5000;
app.listen( PORT, () => (
    console.log( `Listening on port ${PORT}...` )
))