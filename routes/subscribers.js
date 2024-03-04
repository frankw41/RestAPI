const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

// GET ALL ROUTE
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
})

// GET ONE ROUTE
router.get('/:id', getSubscriber, async (req, res) => {
    res.send(res.subscriber)
})

// POST ONE ROUTE
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message })
    }
})

// UPDATE ONE ROUTE
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// DELETE ONE ROUTE
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({message: "Deleted subscriber"})
    } catch (err) {
        res.status(500).json({message: err.message })
    }
})


// Middleware
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(!subscriber){
            return res.status(404).json({message: "Cannot find subscriber"})
        }
    
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}


module.exports = router