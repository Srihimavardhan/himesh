const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    rno: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Users', userSchema)