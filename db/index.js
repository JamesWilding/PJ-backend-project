const {Movie} = require('./Movie');
const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');

Movie.belongsTo(User, {foreignKey: 'movieId'}); // Kitten table, there will be an ownerId <- FK
User.hasMany(Movie);

module.exports = {
    Movie,
    User,
    sequelize,
    Sequelize
};