import express from 'express'
import asyncHandler from 'express-async-handler'
import Safety from '../models/safetyModel.js'

const router = express.Router()
// @desc Fetch all safety locations
// @route GET api/safety
router.get('/', asyncHandler(async (req, res) => {
    const safetyLocations = await Safety.find({})

    if (safetyLocations) {
        res.json(safetyLocations)
    } else {
        res.status(404).json({ message: 'Safety Details Not Found' })
    }
}))

// @desc Fetch specific safety location
// @route GET api/safety/endPoint
router.get('/:endPoint/:location/:year/:month/:day', asyncHandler(async (req, res) => {
    const safetyLocation = await Safety.findOne({ endPoint: req.params.endPoint, location: req.params.location, year: req.params.year, month: req.params.month, day: req.params.day }).exec()
    if (safetyLocation) {
        res.json(safetyLocation)
    } else {
        res.status(404).json({ message: 'Safety Detail Not Found' })
    }
}))

router.post('/:endPoint/:location/:year/:month/:day/like/:timeOfDay', asyncHandler(async (req, res) => {
    if (!req.session.user_id) {
        res.status(400).send("Must be logged in to vote");
        return;
    }
    const conditions = {
        endPoint: req.params.endPoint,
        location: req.params.location,
        year: req.params.year,
        month: req.params.month,
        day: req.params.day,
        "properties.timeOfDay": req.params.timeOfDay
    };
    let login_name = req.session.login_name;
    Safety.findOneAndUpdate(conditions, { $addToSet: { "properties.$.users": login_name } }, { new: true }, function (err, safetyRecord) {
        if (err) {
            res.send(err);
        } else {
            res.send(safetyRecord);
        }
    })
}))

router.post('/:endPoint/:location/:year/:month/:day/unlike/:timeOfDay', asyncHandler(async (req, res) => {
    if (!req.session.user_id) {
        res.status(400).send("Must be logged in to vote");
        return;
    }
    const conditions = {
        endPoint: req.params.endPoint,
        location: req.params.location,
        year: req.params.year,
        month: req.params.month,
        day: req.params.day,
        "properties.timeOfDay": req.params.timeOfDay
    };
    let login_name = req.session.login_name;
    Safety.findOneAndUpdate(conditions, { $pull: { "properties.$.users": login_name } }, { new: true }, function (err, safetyRecord) {
        if (err) {
            res.send(err);
        } else {
            res.send(safetyRecord);
        }
    })
}))


export default router