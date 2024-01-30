const mongoose  = require('mongoose')

//  USer Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default:'user'
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    }

},{timestamps:true})

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel