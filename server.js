'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/User')

// seed the database - 5 books
const booksWeLove = new User({
  email: 'shelby.harner@gmail.com',
  books: [
    {
      name: 'The subtle art of not giving a F*ck',
      author: 'Mark Manson',
      description: 'A counterintuitive approach to a good life.'
    },

    {
      name: '48 Laws of Power',
      author: 'Robert Green',
      description: 'A moral, cunning, ruthless and instructive way to achieve power.'
    },

    {
      name: 'Five Love Languages',
      author: 'Gary Chapman',
      description: 'The secret to love that lasts.'
    },

    {
      name: 'Markus Garvy: Life Lessons',
      author: 'Robert A. Hill',
      description: 'Autobiography about the man and the movement'
    },

    {
      name: 'The Wise Mind of H.I.M Emperor Halie Sellassie I',
      author: 'Asheda Dwyer',
      description: 'Reflections on how to develop ones self'
    },
  ]
});

booksWeLove.save();
// console.log(booksWeLove);

app.get('/', (request, response) => {
  response.send('These are our cool books!');
});

app.get('/books', (request, response) => {
  User.find((error, databaseResults) => {
    console.log(databaseResults);
    if (error) return console.error(error)
    response.send(databaseResults);
  })
});

// app.get('/books', (request, response) => {
//   let results = User.find({})
//   response.send(results)
// })

app.listen(3001, () => console.log('listening on 3001'));
