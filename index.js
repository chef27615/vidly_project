// dependencies
const express = require('express');

// routes
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();
app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

app.get('/', (req, res) => {
    res.status(200).json({'connection':'great'})
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`**********\n\nserver start at ${port}\n\n*********`));