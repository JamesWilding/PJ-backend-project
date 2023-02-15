const {sequelize} = require('./db');
const {Movie, User} = require('./');
const {movies, users} = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Movie.bulkCreate(movies);
  await User.bulkCreate(users);
};

module.exports = seed;
