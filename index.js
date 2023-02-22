const express = require('express');
const app = express();
const {Movie} = require("./db/Movie")

app.use(express.json())

app.get("/movies", async(req, res) => {
    const movies = await Movie.findAll();
    res.send(movies);
})

app.post("/movies", async(req,res) =>{
    const { title, genre, rating } = req.body
    await Movie.create({title, genre, rating})
    res.json(200)
})

app.delete("/movies/:id", async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({
        where: {id}
    })
    res.send(`Deleted Movie ${id}`)
})

app.put('/movies/:id', async (req, res) => {
    const requestedId = req.params.id
    const movie = await Movie.findOne({ where: {id:requestedId}})
    movie.rating = req.body.rating;
    await movie.save();
    res.send(`Updated film`);
});


// we export the app, not listening in here, so that we can run tests
module.exports = app;
