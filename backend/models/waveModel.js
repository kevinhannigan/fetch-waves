import mongoose from 'mongoose'

const waveSchema = mongoose.Schema({
    endPoint: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    lake: {
        type: String,
        required: true
    },
    properties: {
        type: Array,
        required: true
    },
    last_modified: {
        type: Date,
        required: true
    },
    report: {
        type: Array,
        required: true
    },
    watertemp: {
        type: String,
        required: true
    },

})

const Waves = mongoose.model('Wave', waveSchema)

export default Waves