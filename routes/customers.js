// dependencies******
const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
// router ***********

const router = express.Router()

// set schema ************

const customerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    phone : {
        type: String,
        required: true,
        match: /[0-9] [9-0] {9,14}/
    },
    isGold : {
        type : Boolean,
        default: false
    }
})

const Customer = mongoose.model('Customer', customerSchema)

router.get('/', async (req, res) => {
    try{
        const customer = await Customer.find().sort('name');
        res.send(genres)
    }catch(err){
        res.status(404).json({'ERROR':`${err.message}`})
    }
        
})

router.get('/:id', async (req, res) => {
    try{
        const customer = await Customer.findById(req.params.id)
        if(!customer) return res.status(404).send('Item Not Found')
        res.send(customer)
    } catch(err){
        res.status(404).json({'ERROR':'No item found in database'})
    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = validateCustomer(req.body);
        if(error) return res.status(400).send(error.details[0].message)
        let customer = new Customer({name : req.body.name});
        customer = await customer.save()
        res.status(201).json(customer)
    } catch(err){
        res.status(403).json({'WARNING':'CANNOT Create item'})
    }
    
})

// help me to validate input
const validateGenre = (genre) => {
    const schema ={
        name : Joi.string().min(4).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router