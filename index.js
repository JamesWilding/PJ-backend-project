const express = require('express');
const app = express();
const {Movie} = require("./db/Movie")
const {User} = require('./db/User')
const bcrypt = require('bcrypt')

const SALT_COUNT = 7;

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

app.post('/register' , async (req,res,next) =>{
try {
    const {username, password} = req.body;
    const hashed = await bcrypt.hash(password, SALT_COUNT)
    await User.create ({username, password:hashed })
    res.send(`successfully created user ${username}`);
  } catch (error){
    console.log(error);
    next(error)
}
})

app.post("/login", async (req,res,next) =>{
    try {
      const {username, password} = req.body;
      const user = await User.findOne({where:{username}})
      if (!user){
        res.send('User is not found')
        return
      }
      const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      res.status(401).send('incorrect username or password')
      return
    }
  
    res.send(`successfully logged in user ${username}`)
    } catch (error) {
      console.log(error);
      next(error)
    }
  })


// we export the app, not listening in here, so that we can run tests
module.exports = app;
