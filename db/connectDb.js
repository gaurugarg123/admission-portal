const mongoose = require('mongoose');
const liveDb = 'mongodb+srv://gaurugarg2006:Gaurav@cluster0.rqvgvk8.mongodb.net/admissionPortal?retryWrites=true&w=majority'
const localDb = 'mongodb://127.0.0.1:27017/admissionPortal'
const connectDb = () =>{
    return mongoose.connect(liveDb)
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports = connectDb