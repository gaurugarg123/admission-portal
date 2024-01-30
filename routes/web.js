// =========Web JS===========
const express = require('express')
const FrontController = require('../controllers/FrontController')
const CourseController = require('../controllers/CourseController')
const checkAuth = require('../middleware/auth')
const AdminController = require('../controllers/AdminController')
const router = express.Router()


// Routing localhost:3000

router.get('/', FrontController.login) 
router.get('/dashboard',checkAuth, FrontController.dashboard)
router.get('/about',checkAuth, FrontController.about)
router.get('/contact',checkAuth, FrontController.contact)
router.get('/regestration', FrontController.regestration)
router.get('/profile',checkAuth, FrontController.profile)
router.post('/updateProfile',checkAuth, FrontController.updateProfile)
router.post('/changePassword',checkAuth, FrontController.changePassword)



// User Data
router.post('/user_insert', FrontController.userInsert)

// Get User Course Registration  data (CourseController)
router.post('/course_insert',checkAuth, CourseController.courseInsert)
router.get('/courseDisplay',checkAuth, CourseController.courseDisplay)
router.get('/courseview/:id',checkAuth, CourseController.courseView)
router.get('/courseEdit/:id',checkAuth, CourseController.courseEdit)
router.post('/course_update/:id',checkAuth, CourseController.courseUpdate)
router.get('/course_delete/:id',checkAuth, CourseController.courseDelete)

// login 
router.post('/varify_login', FrontController.varifyLogin)
router.get('/logout', FrontController.logOut)

// Admin Controller
router.get('/admin/dashboard',checkAuth, AdminController.getUserDisplay)
router.post('/update_status/:id', checkAuth, AdminController.updateStatus)

module.exports = router