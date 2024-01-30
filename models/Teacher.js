const mongoose  = require('mongoose')

//  Teacher Schema
const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

},{timestamps:true})

const TeacherModel = mongoose.model('Teacher',TeacherSchema)

module.exports = TeacherModel