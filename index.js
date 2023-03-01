const express = require('express');
const app = express();
const {Movie} = require("./db/Movie");
const {User} = require('./db/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT_COUNT = 8
const SIGNING_SECRET = process.env.SIGNING_SECRET


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

app.post('/register', async (req,res,next) => {
  try {
    const {username, password} = req.body;
    const hashed = await bcrypt.hash(password, SALT_COUNT)
    const {id} = await User.create ({username, password:hashed })
    const token = jwt.sign({id,username}, SIGNING_SECRET)
    res.send({message: "User Registered" , token});
  } catch (error) {
    console.log(error);
    next(error) 
  }
})

app.post("/login", async (req,res,next) =>{
  try{
      const {username, password} = req.body;
      const user = await User.findOne({where:{username}})
  if(!user){
    res.send('User not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
      const token = jwt.sign(username, SIGNING_SECRET)
      res.send({ message: "You're now logged in" , token})
    }else{
      res.send("Username or Password are incorrect") 
    }
    } catch (error) {
      console.log(error);
      next(error)
    }
    })


// we export the app, not listening in here, so that we can run tests
module.exports = app;
