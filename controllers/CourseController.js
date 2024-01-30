const CourseModel = require('../models/Course')
const nodemailer = require('nodemailer')
class CourseController {

    // Get User Course Registration  data
    static courseInsert = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, phone, city, course, address } = req.body
            const result = new CourseModel({
                name: name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                course: course,
                user_id: req.data1.id

            })
            await result.save()
            res.redirect('/courseDisplay') // redirect to Course Display Status
            this.sendMail(name,email)
        } catch (error) {
            console.log(error)
        }
    }
    static courseDisplay = async (req, res) => {
        try {
            const {name,image} = req.data1;
            const data = await CourseModel.find()
            // console.log(data)
            res.render('courseDisplay', {d:data, n: name, img: image})
            
        } catch(err) {
            console.log(err)

        }
    }
    static courseView = async (req, res) => {
        try {
            const {name,image} = req.data1;
            // console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            // console.log(data)
            res.render('courseView', {d:data,n: name, img: image})
            
        } catch(err) {
            console.log(err)

        }
    }
    static courseEdit = async (req, res) => {
        try {
            const {name,image} = req.data1;
            // console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            // console.log(data)
            res.render('courseEdit', {d:data, n: name, img: image})
            
        } catch(err) {
            console.log(err)

        }
    }
    static courseUpdate = async (req, res) => {
        try {
            // console.log(req.params.id)
            // console.log(req.body)
            const { name, email, phone, city, course, address } = req.body
            const data = await CourseModel.findByIdAndUpdate(req.params.id,{
                name: name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                course: course
            })
            res.redirect('/courseDisplay') // route ka path 
            // console.log(data)
            
        } catch(err) {
            console.log(err)

        }
    }
    static courseDelete = async (req, res) => {
        try {
            await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/courseDisplay') // route ka path 
            
        } catch(err) {
            console.log(err)

        }
    }
    static sendMail = async (name, email) =>{
        // console.log(name,email)
        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
      
            auth: {
              user: "gaurugarg2006@gmail.com",
              pass: "fimurykndgxtarbb",
            },
          });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Course Created Succesfully", // Subject line
            text: "Hello", // plain text body
            html: `<b>${name}</b> Course Insert Succesfully! `, // html body
        });
          //console.log("Messge sent: %s", info.messageId);
    };
}
module.exports = CourseController