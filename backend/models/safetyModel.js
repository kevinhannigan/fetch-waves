import mongoose from 'mongoose'

const safetySchema = mongoose.Schema({
    endPoint: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    properties: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },

})

const Safety = mongoose.model('safety', safetySchema, 'safety')

export default Safety