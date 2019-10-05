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
    res.status(200).json({'connection':'great'})
})


app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(400).json({'Error':'nothing found'})
    res.send(genre)
})

app.post('/api/genres', (req, res) => {

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id : genres.length + 1,
        name : req.body.name
    };
    genres.push(genre)
    res.status(201).json(genre)
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).json({'Error':'genre not found'});

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.detail[0].message);

    genre.name = req.body.name
    res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).json({'Error':'no genre found'});

    const index = genres.indexOf(genre);
    genres.splice(index, 1)
    res.send(genres)
})


// help me to validate input
const validateGenre = (genre) => {
    const schema ={
        name : Joi.string().min(4).required()
    }
    return Joi.validate(genre, schema)
}



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`**********\n\nserver start at ${port}\n\n*********`));