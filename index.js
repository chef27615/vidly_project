// dependencies
const express = require('express');
const mongoose = require('mongoose');

// imported routes
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();
app.use(express.json());

//connect with db
// set mongodb base connection *******************
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb+srv://ray123:ray123@raycluster01-upbcw.mongodb.net/vidly?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: false})
.then(() => console.log('connected to Vidly backend... '))
.catch(err => console.log('CONNECTION ERROR: ', err))
//*************************************************


// routes in app ******
app.use('/api/genres', genres);
app.use('/', home);

// ******
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`**********\n\nserver start at ${port}\n\n*********`));