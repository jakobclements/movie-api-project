require('dotenv').config();
const express = require('express');
const router = express.Router();

// Get API key from .env
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Search TMDB
router.get('/', async (req, res) => {

    // Get query param
    const query = req.query.q;

    // If no query, exit
    if (!query) {return res.json('No results');}

    try {
        // Call TMDB API with search query
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);

        // If response not ok, exit
        if (!response.ok) {return res.json("Error fetching from TMDB");}

        // Show results
        const results = await response.json();
        res.json(results.results);
        
    // Catch errors
    } catch (error) {res.json('Error');}
});

module.exports = router;