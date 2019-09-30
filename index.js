const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const genres = [
    { id: 1, name:'genre_1' },
    { id: 2, name:'genre_2' },
    { id: 3, name:'genre_3' },
]

app.get('/', (req, res) => {
    res.send(genres)
})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`**********\n\nserver start at ${port}\n\n*********`));