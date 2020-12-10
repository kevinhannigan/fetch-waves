import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    login_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const User = mongoose.model('users', userSchema, 'users')

export default User