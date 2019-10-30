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
        res.send(customer)
    }catch(err){
        res.status(404).json({'ERROR':`${err.message}`})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if(!customer) return res.status(404).json({'ERROR':'ID do not exist'})
        res.send(customer)
    } catch (err) {
        res.status(500).json({'Message' : `${err.message}`})
    }
})

router.post('/', async (req, res) => {
    try {
        let customer = new Customer({name : req.body.name, phone: req.body.phone, isGold: req.body.isGold});
        customer = await customer.save()
        res.status(201).json(customer)
    } catch (err) {
        res.status(400).json({'Message':'something is wrong here'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id)
        if(!customer) return res.status(404).json({'ERROR':'ID does not exist'})

    } catch (err) {
        res.status(500).json({'Message':`${err.message}`})
    }
})

module.exports = router