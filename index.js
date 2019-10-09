// dependencies
const express = require('express');

// routes
const genres = require('./routes/genres');


const app = express();
app.use(express.json());
app.use('/api/genres', genres);


app.get('/', (req, res) => {
    res.status(200).json({'connection':'great'})
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`**********\n\nserver start at ${port}\n\n*********`));