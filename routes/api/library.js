const express = require('express');
const router = express.Router();

// Mock data for testing
let movies = [
    {id: 1, title: 'The Matrix', year: '1999'},
    {id: 2, title: 'Inception', year: '2010'}
];

// GET: list all movies
router.get('/', (req, res) => {
    res.json(movies);
});

// GET: details about a movie
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (!movie) {return res.json('Movie not found')};
    res.json(movie);
});

// POST: add a movie
router.post('/add', (req, res) => {
    const maxId = movies.length === 0 ? 0 : Math.max(...movies.map(movie => movie.id));
    const movie = {
        id: maxId + 1,
        title: req.body.title,
        year: req.body.year
    };
    movies.push(movie);
    res.json('Added movie');
});

// PUT: edit movie info
router.put('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (!movie) {return res.json('Movie not found');}
    if (req.body.title) {movie.title = req.body.title;}
    if (req.body.year) {movie.year = req.body.year;}
    res.json('Edited movie');
});

// DELETE: remove movie
router.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    if (index === -1) {return res.json('Movie not found');}
    movies.splice(index, 1);
    res.json('Deleted movie');
});

module.exports = router;