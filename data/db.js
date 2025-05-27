const Database = require('better-sqlite3');
const db = new Database('library.db', { verbose: console.log });

// Create movies table if not exists
db.prepare(` 
    CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        title TEXT,
        year TEXT
    )
`).run();

// Populate movies table if empty
const rows = db.prepare('SELECT COUNT(*) AS rows FROM movies').get().rows;
if (rows === 0) {
    console.log('0 rows found, adding data...');

    // Starting data
    const movies = [
        {id: 1, title: 'The Matrix', year: '1999'},
        {id: 2, title: 'Inception', year: '2010'}
    ];

    // Insert starting data
    movies.forEach(movie => {
        db.prepare(`INSERT INTO movies (title, year) VALUES (?, ?)`).run(movie.title, movie.year);
    });

    console.log('Database initialized');
}

// Show data for debugging
console.log(db.prepare('SELECT * FROM movies').all());

module.exports = db;