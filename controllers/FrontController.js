const UserModel = require('../models/User');
const CourseModel = require('../models/Course');
const TeacherModel = require('../models/Teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dokvyuwfh',
    api_key: '172978426261623',
    api_secret: 'pVTkLLoUpepXOJ-wz2tapxrSNbw'
});

class FrontController {

    static dashboard = async (req, res) => {
        try {
            const { name, image, id } = req.data1;
            const btech = await CourseModel.findOne({ user_id: id, course: 'btech' });
            const bca = await CourseModel.findOne({ user_id: id, course: 'BCA' });
            const mca = await CourseModel.findOne({ user_id: id, course: 'MCA' });
            res.render('dashboard', { n: name, img: image, btech: btech, bca: bca, mca: mca });

        } catch (error) {
            console.log(error);
        }
    };
    static about = (req, res) => {
        try {
            const { name, image } = req.data1;
            res.render('about', { n: name, img: image });
        } catch (error) {
            console.log(error);
        }
    };
    static profile = (req, res) => {
        try {
            const { name, image, email } = req.data1;
            res.render('profile', { n: name, img: image, e: email, msg: req.flash() });
        } catch (error) {
            console.log(error);
        }
    };
    static updateProfile = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.files.image)
            const { name, email, image } = req.body
            if (req.files) {
                const userImg = await UserModel.findById(req.data1.id)
                const imgId = userImg.image.public_id
                await cloudinary.uploader.destroy(imgId) // for delete IMG
                const file = req.files.image; // for upload image to Cloudnary
                const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                    // console.log(file)
                    folder: 'profileImage'
                });
                // console.log(imageUpload)
                var data = {
                    name: name,
                    email: email,
                    image: {
                        public_id: imageUpload.public_id,
                        url: imageUpload.secure_url
                    }
                }
                // console.log(imgId)
                // console.log(userImg)
            } else {
                var data = {
                    name: name,
                    email: email,
                }
            }
            await UserModel.findByIdAndUpdate(req.data1.id, data)
            req.flash('success', 'Profile Update Successfully')
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }
    static changePassword = async (req, res) => {  
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const user = req.data1;
            if (oldPassword && newPassword && confirmPassword) {
                if (newPassword == confirmPassword) {
                    const isMatched = await bcrypt.compare(oldPassword, user.password);
                    if (isMatched) {
                        if (newPassword == oldPassword) {
                            req.flash("error", "New Password & Old Password can not be same!");
                            res.redirect("/profile");
                        }
                        else {
                            const hashPassword = await bcrypt.hash(newPassword, 10);
                            await UserModel.updateOne({ email: user.email }, {
                                password: hashPassword
                            });
                            req.flash("success", "Password Changed Successfully, Please Login Again!");
                            res.redirect("/logout");
                        }
                    }
                    else {
                        req.flash("error", "Old Password Does not match!");
                        res.redirect("/profile");
                    }
                }
                else {
                    req.flash("error", "New Password & confirm Password does not match!");
                    res.redirect("/profile");
                }
            }
            else {
                req.flash("error", "All Fields are Required!");
                res.redirect('/profile');
            }
        } catch (error) {
            console.log(error);
            req.flash("error", error.message);
            res.redirect("/profile");
        }
    };
    static regestration = (req, res) => {
        try {
            res.render('regestration', { msg: req.flash('error') });
        } catch (error) {
            console.log(error);
        }
    };
    static contact = (req, res) => {
        try {
            const { name, image } = req.data1;
            res.render('contact', { n: name, img: image });
        } catch (error) {
            console.log(error);
        }
    };
    static login = (req, res) => {
        try {
            res.render('login', { msg: req.flash('success'), msg1: req.flash('error') });
        } catch (error) {
            console.log(error);
        }
    };
    static courseRegestration = (req, res) => {
        try {
            const { name, image } = req.data1;
            res.render('courseRegestration', { n: name, img: image });
        } catch (error) {
            console.log(error);
        }
    };
    // Get User Sign in data
    static userInsert = async (req, res) => {
        try {
            // console.log(req.files.img)
            const file = req.files.img; // for upload image to Cloudnary
            // console.log(file)
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileImage'
            });
            // console.log(imageUpload)
            // console.log(req.body)
            const { n, e, p, cp } = req.body;
            const user = await UserModel.findOne({ email: e });
            // console.log(user)
            if (user) {
                req.flash('error', 'Email Already Exist');
                res.redirect('/regestration');
            } else {
                if (n && e && p && cp) {
                    if (p === cp) {
                        const hashpassword = await bcrypt.hash(p, 10);
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: hashpassword,
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }


                        });
                        await result.save();
                        req.flash('success', 'Registration Succesfully, Please Login');
                        res.redirect('/'); // redirect to login page
                    } else {
                        req.flash('error', 'Password and Confirm Password does not match');
                        res.redirect('/regestration');
                    }
                } else {
                    req.flash('error', 'All field are Required');
                    res.redirect('/regestration');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    // User login Method 
    static varifyLogin = async (req, res) => { 
        try {
            // console.log(req.body)
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModel.findOne({ email: email });
                // console.log(user)
                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password);
                    // console.log(isMatched)
                    if (isMatched) {
                        if(user.role == 'admin'){
                            const token = jwt.sign({ ID: user.id }, 'Gaurav@123456');
                            // console.log(token)
                            res.cookie('token', token);
                            res.redirect('/admin/dashboard');
                        }
                        if(user.role == 'user'){
                            const token = jwt.sign({ ID: user.id }, 'Gaurav@123456');
                            // console.log(token)
                            res.cookie('token', token);
                            res.redirect('/dashboard');
                        }
                    } else {
                        req.flash('error', 'Email & Password does not Match, Try Agian');
                        res.redirect('/');
                    }
                } else {
                    req.flash('error', 'You are not Registered User, Please Register');
                    res.redirect('/');
                }
            } else {
                req.flash('error', 'All field are Required');
                res.redirect('/');
            }
        } catch (err) {
            console.log(err);
        }
    };
    // Logout Method
    static logOut = async (req, res) => {
        try {
            res.clearCookie('token');
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    };


}
module.exports = FrontController;