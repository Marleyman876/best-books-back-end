'use strict'
const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/User')

// seed the database - 5 books
const booksWeLove = new User({
  email: 'shelby.harner@gmail.com',
  books: [
    {
      title: 'The subtle art of not giving a F*ck',
      author: 'Mark Manson',
      description: 'A counterintuitive approach to a good life.'
    },

    {
      title: '48 Laws of Power',
      author: 'Robert Green',
      description: 'A moral, cunning, ruthless and instructive way to achieve power.'
    },

    {
      title: 'Five Love Languages',
      author: 'Gary Chapman',
      description: 'The secret to love that lasts.'
    },

    {
      title: 'Markus Garvy: Life Lessons',
      author: 'Robert A. Hill',
      description: 'Autobiography about the man and the movement'
    },

    {
      title: 'The Wise Mind of H.I.M Emperor Halie Sellassie I',
      author: 'Asheda Dwyer',
      description: 'Reflections on how to develop ones self'
    },
  ]
});

booksWeLove.save();
console.log(booksWeLove);

app.get('/', (request, response) => {
  response.send('These are our cool books!');
});

app.get('/books', (request, response) => {
  User.find((databaseResults) => {
    response.send(databaseResults);
  })
})

app.listen(3001, () => console.log('listening on 3001'));
