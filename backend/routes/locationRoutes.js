import express from 'express'
import asyncHandler from 'express-async-handler'
import Locations from '../models/locationModel.js'

const router = express.Router()
// @desc Fetch all sub locations
// @route GET api/locations
router.get('/', asyncHandler(async (req, res) => {
    const locations = await Locations.find({})
    
    res.json(locations)
}))

// @desc Fetch specific wave location
// @route GET api/waves/endPoint
router.get('/:endPoint', asyncHandler(async (req, res) => {
    const location = await Locations.findOne({endPoint: req.params.endPoint})

    if(location) {
        res.json(location)
    } else {
        res.status(404).json({message: 'Wave Location Not Found'})
    }
}))

export default router