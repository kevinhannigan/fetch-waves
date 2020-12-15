import mongoose from 'mongoose'

const locationSchema = mongoose.Schema({
    endPoint: {
        type: String,
        required: true
    },
    locations: {
        type: Array,
        required: true
    }

})

const Locations = mongoose.model('sublocations', locationSchema, 'subLocations')

export default Locations