const express = require('express')
const Joi = require('Joi')


const router = express.Router()

const genres = [
    { id: 1, name:'genre_1' },
    { id: 2, name:'genre_2' },
    { id: 3, name:'genre_3' },
]

router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(400).json({'Error':'nothing found'})
    res.send(genre)
})

router.post('/', (req, res) => {

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id : genres.length + 1,
        name : req.body.name
    };
    genres.push(genre)
    res.status(201).json(genre)
})

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).json({'Error':'genre not found'});

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.detail[0].message);

    genre.name = req.body.name
    res.send(genre)
})

router.delete('/:id', (req, res) => {
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

module.exports = router