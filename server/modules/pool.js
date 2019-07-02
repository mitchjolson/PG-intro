const pg = require('pg');

const Pool = pg.Pool;

const config = {
    database: 'playfair_songs',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000 // 30 seconds
}

const pool = new Pool(config);

pool.on('connect', () => {
    console.log( 'Database connected');
});

pool.on('error', () => {
    console.log( 'error connecting to database on', error );
});

module.exports = pool;