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
        res.send(response.rows);
    }).catch( (error) => {
        console.log('Error getting music from db', error)
        res.sendStatus(500);
    })
})

app.post( '/music', (req, res) => {
    const newSong = req.body;
    console.log('Adding new song', newSong);
    const sqlText = `INSERT INTO "songs"("rank", "artist", "track", "published") 
    VALUES($1, $2, $3, $4);`;
    const values = [newSong.rank, newSong.track, newSong.artist, newSong.published];
    pool.query(sqlText, values)
    .then( (response) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error adding song to db', error)
        res.sendStatus(500);
    })
})


// Start up the server
const PORT = process.env.PORT || 5000;
app.listen( PORT, () => (
    console.log( `Listening on port ${PORT}...` )
))