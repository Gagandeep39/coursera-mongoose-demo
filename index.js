/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-08 05:43:52
 * @modify date 2020-12-08 05:43:52
 * @desc [description]
 */
require('dotenv').config();

// Update env to localhost  or rmove env file f running locally i.e outside devcontainer
const url = `mongodb://${process.env.HOST_NAME || 'localhost'}:27017/gagan`;
const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');

  Dishes.create({
    name: 'Uthappizza',
    description: 'test',
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: 'Updated test' },
        },
        {
          new: true,
        }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: "I'm getting a sinking feeling!",
        author: 'Leonardo di Carpaccio',
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.remove({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
