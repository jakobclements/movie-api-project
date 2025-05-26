const express = require('express');
const router = express.Router();
const db = require('../../data/db');

// GET: list all movies
router.get('/', (req, res) => {
    const movies = db.prepare(`SELECT * FROM movies`).all();
    res.json(movies);
});

// GET: details about a movie
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = db.prepare('SELECT * FROM movies WHERE id = ?').get(id);
    if (!movie) {return res.json('Movie not found')};
    res.json(movie);
});

// POST: add a movie
router.post('/add', (req, res) => {
    const movie = {
        title: req.body.title,
        year: req.body.year
    };
    db.prepare(`INSERT INTO movies (title, year) VALUES (?, ?)`).run(movie.title, movie.year);
    res.json('Added movie');
});

// PUT: edit movie info
router.put('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = db.prepare('SELECT * FROM movies WHERE id = ?').get(id);
    if (!movie) {return res.json('Movie not found');}
    if (req.body.title) {db.prepare('UPDATE movies SET title = ? WHERE id = ?').run(req.body.title, id);}
    if (req.body.year) {db.prepare('UPDATE movies SET year = ? WHERE id = ?').run(req.body.year, id);}
    res.json('Edited movie');
});

// DELETE: remove movie
router.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = db.prepare('SELECT * FROM movies WHERE id = ?').get(id);
    if (!movie) {return res.json('Movie not found');}
    db.prepare('DELETE FROM movies WHERE id = ?').run(id);
    res.json('Deleted movie');
});

module.exports = router;