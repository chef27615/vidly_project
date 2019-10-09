// dependencies
const express = require('express');

// imported routes
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();
app.use(express.json());

// routes in app ******
app.use('/api/genres', genres);
app.use('/', home);

// ******
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`**********\n\nserver start at ${port}\n\n*********`));