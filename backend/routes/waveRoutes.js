import express from 'express'
import asyncHandler from 'express-async-handler'
import Waves from '../models/waveModel.js'

const router = express.Router()
// @desc Fetch all wave locations
// @route GET api/waves
router.get('/', asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        endPoint: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const waves = await Waves.find({...keyword})
    
    res.json(waves)
}))

// @desc Fetch specific wave location
// @route GET api/waves/endPoint
router.get('/:endPoint', asyncHandler(async (req, res) => {
    const wave = await Waves.findOne({endPoint: req.params.endPoint})

    if(wave) {
        res.json(wave)
    } else {
        res.status(404).json({message: 'Waves Not Found'})
    }
}))

export default router