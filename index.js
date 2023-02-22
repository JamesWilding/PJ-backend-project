const express = require('express');
const app = express();
const {Movie} = require("./db/Movie")

app.get("/movies", async(req, res) => {
    const movies = await Movie.findAll();
    res.send(movies);
})

// we export the app, not listening in here, so that we can run tests
module.exports = app;
