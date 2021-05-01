'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/User');
const { res } = require('express');

// seed the database - 5 books
// const booksWeLove = new User({
//   email: 'shelby.harner@gmail.com',
//   books: [
//     {
//       name: 'The subtle art of not giving a F*ck',
//       author: 'Mark Manson',
//       description: 'A counterintuitive approach to a good life.'
//     },

//     {
//       name: '48 Laws of Power',
//       author: 'Robert Green',
//       description: 'A moral, cunning, ruthless and instructive way to achieve power.'
//     },

//     {
//       name: 'Five Love Languages',
//       author: 'Gary Chapman',
//       description: 'The secret to love that lasts.'
//     },

//     {
//       name: 'Markus Garvy: Life Lessons',
//       author: 'Robert A. Hill',
//       description: 'Autobiography about the man and the movement'
//     },

//     {
//       name: 'The Wise Mind of H.I.M Emperor Halie Sellassie I',
//       author: 'Asheda Dwyer',
//       description: 'Reflections on how to develop ones self'
//     },
//   ]
// });

// booksWeLove.save();
// // console.log(booksWeLove);

app.get('/', (req, res) => {
  res.send('These are our cool books!');
});

app.get('/books', (req, res) => {
  User.find((error, databaseResults) => {
    console.log(databaseResults);
    if (error) return console.error(error)
    res.send(databaseResults);
  })
});

app.post('/books', (req, res) => {
  console.log(req.body)
  User.find({ email: req.body.email }, (err, databaseResults) => {
    if (databaseResults.length < 1) {
      res.status(400).send('user does not exist');
    } else {
      let user = databaseResults[0];
      console.log(user)
      user.books.push({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description
      });
      user.save().then((databaseResults) => {
        res.send(databaseResults.books)
      });
    }
  });
});


app.listen(3001, () => console.log('listening on 3001'));
