const CourseModel = require('../models/Course')
const nodemailer = require('nodemailer')
class AdminController {
    static getUserDisplay = async (req,res) =>{
        try {
            const {name,image} = req.data1
            const course = await CourseModel.find()
            res.render('admin/getUserDisplay', {n:name, img: image, c:course})
        } catch (error) {
            console.log(error)
        }
    }
    static updateStatus = async (req,res) =>{
        try {
            const { comment, name, email, status } = req.body
            await CourseModel.findByIdAndUpdate(req.params.id, {
                comment: comment,
                status: status
            })
            this.sendMail(name,email,status,comment)
            res.redirect('/admin/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
    static sendMail = async (name, email,status,comment) =>{
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
            subject: ` Course ${status}`, // Subject line
            text: "Hello", // plain text body
            html: `<b>${name}</b> Course  <b>${status}</b> successfull! <br>
             <b>Comment from Admin</b> ${comment} `, // html body
        });
          //console.log("Messge sent: %s", info.messageId);
    };

}


module.exports = AdminController
