const {Sequelize, sequelize} = require('./db');

const Movie = sequelize.define('movie', {
  title: Sequelize.STRING,
  genre: Sequelize.STRING,
  rating: Sequelize.STRING
});

module.exports = { Movie };